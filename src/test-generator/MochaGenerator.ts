import * as fs from "fs";
import * as _ from "lodash";
import * as Mustache from "mustache";
import * as path from "path";
import {Utils} from "../common/Utils";
import { AbstractTestGenerationHook } from "../hooks/lib/AbstractTestGenerationHook";
import {HttpRequest} from "../proxy-server/HttpRequest";
import {IMethodCall, IRequestsMethod, IRequestsView, ISpecView} from "./templateTypes";


const dockerNames = require("docker-names");

const templateDirPath = path.resolve(__dirname, "..", "..", "src", "templates");
const outputDirPath = path.resolve(__dirname, "..", "..", "src", "generated-tests");

const camel = require("to-camel-case");

class Templates {
    public static TemplateRequests = fs.readFileSync(path.join(templateDirPath, "TemplateRequests.ts")).toString();
    public static TemplateSpec = fs.readFileSync(path.join(templateDirPath, "TemplateSpec.ts")).toString();
}

export class MochaGenerator {
    private hooks: AbstractTestGenerationHook[];

    constructor(hooks: AbstractTestGenerationHook[]) {
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
        const className = Utils.getRequestsClassName(classPrefix);
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
        const fileName = `${Utils.getSpecClassName(this.generateClassPrefix())}.ts`;
        const requestsImports = [
            {importLine: `import {${requestsView.className}} from "./${requestsView.className}";`},
            {importLine: `import { runRequest } from '../common/testUtils';`},
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

        const methodSuffixArray: string[] = [];

        return _.map(requests, (req: HttpRequest) => {

            const safeRequest = Utils.escapeForTemplateStrings(req);
            const {defaultValues, allParams} = this.applyBeforeTestGenerationHooks(safeRequest);
            const methodNameSuffix = this.getMethodSuffix(req, methodSuffixArray);

            return {
                defaultValues,
                nameSuffix: methodNameSuffix,
                params: allParams,
                returnType: ": HttpRequest", // : is mandatory
                returnValue: Utils.stringifyRawRequests(safeRequest),
            } as IRequestsMethod;
        });
    }

    private generateMethodsCall(requestsView: IRequestsView): IMethodCall[] {

        const methodCalls: IMethodCall[] = [];
        _.forEach(requestsView.requestsMethods, (method: IRequestsMethod) => {
            methodCalls.push({
                methodCall: Utils.getRequestsMethodCall(method.nameSuffix, method.defaultValues),
            });
        });
        return methodCalls;
    }

    private initMustacheTemplates() {
        const customTags = ["/*<", ">*/"];
        Mustache.parse(Templates.TemplateSpec, customTags);
        Mustache.parse(Templates.TemplateRequests, customTags);
    }

    private getMethodSuffix(req: HttpRequest, methodSuffixArray: string[]) {
        const methodBaseSuffix: string = camel(req.url);
        let methodNameSuffix;
        let i = 0;
        do {
            methodNameSuffix = `${methodBaseSuffix}_${i}`;
            i++;
        } while (methodSuffixArray.indexOf(methodNameSuffix) !== -1);
        methodSuffixArray.push(methodNameSuffix);

        return methodNameSuffix;
    }

    private applyBeforeTestGenerationHooks(req: HttpRequest) {
        const customParams: string[] = [];
        const defaultValues: string[] = [];
        const defaultParams = "defaultArg0?: any, defaultArg1?: any, defaultArg2?: any";

        _.forEach(this.hooks, (hook: AbstractTestGenerationHook) => {
            const args = hook.beforeTestGeneration(req);
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
            defaultValues, allParams,
        };
    }
}
