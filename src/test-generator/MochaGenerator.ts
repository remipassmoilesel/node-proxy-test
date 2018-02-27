import * as fs from "fs";
import * as _ from "lodash";
import * as Mustache from "mustache";
import * as path from "path";
import { NamingUtils } from "../common/NamingUtils";
import { ITestGeneratorHook } from "../hooks/hookTypes";
import { HttpRequest } from "../proxy-server/HttpRequest";
import { IMethodCall, IRequestsMethod, IRequestsView, ISpecView } from "./templateTypes";


const dockerNames = require("docker-names");

const templateDirPath = path.resolve(__dirname, "..", "..", "src", "templates");
const outputDirPath = path.resolve(__dirname, "..", "..", "src", "generated-tests");

const camel = require("to-camel-case");

class Templates {
    public static TemplateRequests = fs.readFileSync(path.join(templateDirPath, "TemplateRequests.ts")).toString();
    public static TemplateSpec = fs.readFileSync(path.join(templateDirPath, "TemplateSpec.ts")).toString();
}

export class MochaGenerator {
    private hooks: ITestGeneratorHook[];

    constructor(hooks: ITestGeneratorHook[]) {
        this.initMustacheTemplates();
        this.hooks = hooks;
    }

    public generate(requests: HttpRequest[]) {
        const requestsView = this.generateRequestsClass(requests);
        this.generateRequestSpec(requestsView);
    }

    private generateRequestsClass(requests: HttpRequest[]): IRequestsView {

        const methods = this.generateMethodsFromRequests(requests);

        const classPrefix = this.generateClassPrefix();
        const className = NamingUtils.getRequestsClassName(classPrefix);
        const fileName = `${className}.ts`;

        const requestsView: IRequestsView = {
            classPrefix,
            className,
            requestsMethods: methods,
        };
        this.render(fileName, Templates.TemplateRequests, requestsView);

        return requestsView;
    }

    private generateRequestSpec(requestsView: IRequestsView) {

        const requestsMethodCalls = this.generateMethodsCall(requestsView);
        const fileName = `${NamingUtils.getSpecClassName(this.generateClassPrefix())}.ts`;
        const requestsImports = [
            { importLine: `import {${requestsView.className}} from "./${requestsView.className}";` },
            { importLine: `import { runRequest } from '../common/testUtils';` },
        ];

        const specView: ISpecView = {
            requestsInstantiation: `const requests = new ${requestsView.className}();`,
            requestsImports,
            requestsMethodCalls,
        };

        this.render(fileName, Templates.TemplateSpec, specView);

    }

    private render(fileName: string, template: string, variables: any) {
        const output = Mustache.render(template, variables);
        fs.writeFileSync(path.join(outputDirPath, fileName), output);
    }

    private generateClassPrefix() {
        const raw = camel(dockerNames.getRandomName());
        return raw.charAt(0).toLocaleUpperCase() + raw.slice(1);
    }

    private generateMethodsFromRequests(requests: HttpRequest[]): IRequestsMethod[] {
        return _.map(requests, (req) => {

            const customParams: string[] = [];
            const defaultValues: string[] = [];
            const defaultParams = "defaultArg0?: any, defaultArg1?: any, defaultArg2?: any";

            _.forEach(this.hooks, (hook) => {
                const args = hook.beforeRender(req);
                if (args && args.length > 0) {
                    _.forEach(args, (methodArg) => {
                        customParams.push(`${methodArg.name}: ${methodArg.type}`);
                        defaultValues.push(methodArg.defaultValue);
                    });
                }
            });

            let allParams = "";
            if (customParams.length > 0) {
                allParams = customParams.join(", ") + ", ";
            }
            allParams += defaultParams;

            return {
                defaultValues,
                nameSuffix: camel(req.url),
                params: allParams,
                returnType: ": HttpRequest", // : is mandatory
                returnValue: this.stringifyReq(req),
            } as IRequestsMethod;
        });
    }

    private generateMethodsCall(requestsView: IRequestsView): IMethodCall[] {
        const methodCalls: IMethodCall[] = [];
        _.forEach(requestsView.requestsMethods, (method: IRequestsMethod) => {
            methodCalls.push({
                methodCall: NamingUtils.getRequestsMethodCall(method.nameSuffix, method.defaultValues),
            });
        });
        return methodCalls;
    }

    /**
     * Here we replace quotes on values by backticks, in order to use template strings.
     * /!\ Some values contains escaped quotes
     */
    private stringifyReq(req: HttpRequest): string {
        const rawJson = JSON.stringify(req, null, 2);
        const jsonLineWithValueRegex = /( *"[^":]+"):\s+(".+)/i;
        const jsonLines = rawJson.split("\n");

        const res = _.map(jsonLines, (line) => {
            const lineMatch = line.match(jsonLineWithValueRegex);

            if (lineMatch && lineMatch.length > 1) {
                let formattedValue: string = lineMatch[2];
                if (formattedValue.match(/,$/)) {
                    formattedValue = formattedValue.slice(0, -1);
                }
                formattedValue = "`" + JSON.parse(formattedValue) + "`,";

                line = line.replace(lineMatch[2], formattedValue);
            }
            return line;
        });
        return res.join("\n");
    }

    private initMustacheTemplates() {
        const customTags = ["/*<", ">*/"];
        Mustache.parse(Templates.TemplateSpec, customTags);
        Mustache.parse(Templates.TemplateRequests, customTags);
    }
}
