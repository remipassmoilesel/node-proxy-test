import * as fs from "fs";
import * as _ from "lodash";
import * as Mustache from "mustache";
import * as path from "path";
import { NamingUtils } from "../common/NamingUtils";
import { ITestGeneratorHook } from "../hooks/hookTypes";
import { HttpRequest } from "../proxy-server/HttpRequest";
import { IMethodCall, ISpecView, IStubMethod, IStubView } from "./templateTypes";


const dockerNames = require("docker-names");

const templateDirPath = path.resolve(__dirname, "..", "..", "src", "templates");
const outputDirPath = path.resolve(__dirname, "..", "..", "src", "generated-tests");

const camel = require("to-camel-case");

class Templates {
    public static TemplateStub = fs.readFileSync(path.join(templateDirPath, "TemplateStub.ts")).toString();
    public static TemplateSpec = fs.readFileSync(path.join(templateDirPath, "TemplateSpec.ts")).toString();
}

export class MochaGenerator {
    private hooks: ITestGeneratorHook[];

    constructor(hooks: ITestGeneratorHook[]) {
        this.initMustacheTemplates();
        this.hooks = hooks;
    }

    public generate(requests: HttpRequest[]) {
        // console.log(requests);

        const stubView = this.generateRequestStub(requests);
        this.generateRequestSpec(stubView);
    }

    private generateRequestStub(requests: HttpRequest[]): IStubView {

        const methods = this.generateMethodsFromRequests(requests);

        const classPrefix = this.generateClassPrefix();
        const className = NamingUtils.getStubClassName(classPrefix);
        const fileName = `${className}.ts`;

        const stubView: IStubView = {
            classPrefix,
            className,
            stubMethods: methods,
        };
        this.render(fileName, Templates.TemplateStub, stubView);

        return stubView;
    }

    private generateRequestSpec(stubView: IStubView) {

        const stubMethodCalls = this.generateMethodsCall(stubView);
        const fileName = `${NamingUtils.getSpecClassName(this.generateClassPrefix())}.ts`;
        const stubImport = `import {${stubView.className}} from "./${stubView.className}";`;

        const specView: ISpecView = {
            stubInstantiation: `const stub = new ${stubView.className}();`,
            stubImport,
            stubMethodCalls,
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

    private generateMethodsFromRequests(requests: HttpRequest[]): IStubMethod[] {
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

            let allParams = '';
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
            } as IStubMethod;
        });
    }

    private generateMethodsCall(stubView: IStubView): IMethodCall[] {
        const methodCalls: IMethodCall[] = [];
        _.forEach(stubView.stubMethods, (method: IStubMethod) => {
            methodCalls.push({ methodCall: NamingUtils.getMethodCall(method.nameSuffix, method.defaultValues) });
        });
        return methodCalls;
    }

    private stringifyReq(req: HttpRequest): string {
        const rawJson = JSON.stringify(req, null, 2);
        const valueRegex = /( *"[^":]+"): ("[^":]+")/i;

        const res = _.map(rawJson.split("\n"), (line) => {
            const lineMatch = line.match(valueRegex);
            if (lineMatch && lineMatch.length > 1) {
                const replacedValue = lineMatch[2].replace(/"/g, "`");
                line = line.replace(lineMatch[2], replacedValue);
            }
            return line;
        });
        return res.join("\n");
    }

    private initMustacheTemplates() {
        const customTags = ["/*<", ">*/"];
        Mustache.parse(Templates.TemplateSpec, customTags);
        Mustache.parse(Templates.TemplateStub, customTags);
    }
}
