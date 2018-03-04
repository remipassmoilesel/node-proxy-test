import * as fs from 'fs';
import * as _ from 'lodash';
import * as Mustache from 'mustache';
import * as path from 'path';
import { Utils } from '../common/Utils';
import { AbstractTestGenerationHook } from '../hooks/lib/AbstractTestGenerationHook';
import { IMethodArgument } from '../hooks/lib/IMethodArgument';
import { HttpRequest } from '../proxy-server/HttpRequest';
import { IMethodCall, IRequestsMethod, IRequestsView, ISpecView } from './templateTypes';


const dockerNames = require('docker-names');

const templateDirPath = path.resolve(__dirname, '..', '..', 'src', 'templates');
const outputDirPath = path.resolve(__dirname, '..', '..', 'src', 'generated-tests');

const camel = require('to-camel-case');

class Templates {
    public static TemplateRequests = fs.readFileSync(path.join(templateDirPath, 'TemplateRequests.ts')).toString();
    public static TemplateSpec = fs.readFileSync(path.join(templateDirPath, 'TemplateSpec.ts')).toString();
}

export class MochaGenerator {
    private hooks: AbstractTestGenerationHook[];

    constructor(hooks: AbstractTestGenerationHook[]) {
        this.initMustacheTemplates();
        this.hooks = hooks;
    }

    public generate(requests: HttpRequest[]) {
        const classPrefix = this.generateClassPrefix();
        const requestsView = this.generateRequestsClass(requests, classPrefix);
        this.generateRequestSpec(requestsView, classPrefix);
    }

    private generateRequestsClass(requests: HttpRequest[], classPrefix: string): IRequestsView {

        const methods = this.generateMethodsFromRequests(requests);

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

    private generateRequestSpec(requestsView: IRequestsView, classPrefix: string) {

        const requestsMethodCalls = this.generateMethodsCall(requestsView);
        const variablesInit = this.generateVariableInit(requestsView);
        const fileName = `${Utils.getSpecClassName(classPrefix)}.ts`;
        const requestsImports = [
            { importLine: `import {${requestsView.className}} from "./${requestsView.className}";` },
            { importLine: `import { TestUtils } from '../common/TestUtils';` },
        ];

        const specView: ISpecView = {
            requestsImports,
            requestsInstantiation: `const requests = new ${requestsView.className}();`,
            variablesInit,
            requestsMethodCalls,
        };

        this.render(fileName, Templates.TemplateSpec, specView);

    }

    private generateMethodsFromRequests(requests: HttpRequest[]): IRequestsMethod[] {

        // this array is used in order to keep method names unique
        const methodSuffixArray: string[] = [];

        return _.map(requests, (req: HttpRequest) => {

            const safeRequest: HttpRequest = Utils.escapeForTemplateStrings(req);
            const { defaultValues, methodArguments, methodArgumentsStr } = this.applyBeforeTestGenerationHooks(safeRequest);
            const methodNameSuffix = this.getMethodSuffix(req, methodSuffixArray);

            return {
                defaultValues,
                methodArgumentsStr,
                methodArguments,
                nameSuffix: methodNameSuffix,
                returnType: ': HttpRequest', // : is mandatory
                returnValue: Utils.stringifyRawRequests(safeRequest),
            } as IRequestsMethod;
        });
    }

    private generateMethodsCall(requestsView: IRequestsView): IMethodCall[] {

        const methodCalls: IMethodCall[] = [];
        _.forEach(requestsView.requestsMethods, (method: IRequestsMethod) => {
            const argumentsNames = _.map(method.methodArguments, (arg) => arg.name);
            methodCalls.push({
                methodCall: this.getRequestsMethodCall(method.nameSuffix, argumentsNames),
            });
        });
        return methodCalls;
    }

    private applyBeforeTestGenerationHooks(req: HttpRequest) {
        let methodArguments: IMethodArgument[] = [];
        const customParams: string[] = [];
        const defaultValues: string[] = [];
        const defaultParamsStr = 'defaultArg0?: any, defaultArg1?: any, defaultArg2?: any';

        _.forEach(this.hooks, (hook: AbstractTestGenerationHook) => {
            const args = hook.beforeTestGeneration(req);
            if (args && args.length > 0) {
                methodArguments = methodArguments.concat(args);
                _.forEach(args, (methodArg) => {
                    customParams.push(`${methodArg.name}: ${methodArg.type}`);
                    defaultValues.push(methodArg.defaultValue);
                });
            }
        });

        let methodArgumentsStr = '';
        if (customParams.length > 0) {
            methodArgumentsStr = customParams.join(', ') + ', ';
        }
        methodArgumentsStr += defaultParamsStr;

        return {
            methodArguments, methodArgumentsStr, defaultValues,
        };
    }

    private generateVariableInit(requestsView: IRequestsView) {
        const allArguments: IMethodArgument[] = _.chain(requestsView.requestsMethods)
            .flatMap((method: IRequestsMethod) => {
                return method.methodArguments;
            })
            .uniqBy((methodArg: IMethodArgument) => methodArg.name)
            .value();

        return _.map(allArguments, (arg) => {
            return { initLine: `const ${arg.name} = ${arg.defaultValue};` };
        });
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

    public getRequestsMethodCall(methodSuffix: string, argumentsName?: string[]): string {
        let argumentsStr = '';
        if (argumentsName && argumentsName.length > 0) {
            argumentsStr += argumentsName.join(', ');
        }
        return `TestUtils.runRequest(requests.request_${methodSuffix}(${argumentsStr}));`;
    }

    private generateClassPrefix() {
        const raw = camel(dockerNames.getRandomName());
        return raw.charAt(0).toLocaleUpperCase() + raw.slice(1);
    }

    private render(fileName: string, template: string, variables: any) {
        const output = Mustache.render(template, variables);
        fs.writeFileSync(path.join(outputDirPath, fileName), output);
    }

    private initMustacheTemplates() {
        const customTags = ['/*<', '>*/'];
        Mustache.parse(Templates.TemplateSpec, customTags);
        Mustache.parse(Templates.TemplateRequests, customTags);
    }

}
