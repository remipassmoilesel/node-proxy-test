import * as Mustache from 'mustache';
import * as _ from 'lodash';
import { HttpRequest } from '../proxy-server/HttpRequest';
import * as fs from 'fs';
import * as path from 'path';
import { IStubMethod, IStubView } from './stubTypes';

const dockerNames = require('docker-names');

const templateDirPath = path.resolve(__dirname, '..', '..', 'src', 'templates');
const outputDirPath = path.resolve(__dirname, '..', '..', 'src', 'generated-tests');

const camel = require('to-camel-case');

class Templates {
    public static TemplateStub = fs.readFileSync(path.join(templateDirPath, 'TemplateStub.ts')).toString();
    public static TemplateSpec = fs.readFileSync(path.join(templateDirPath, 'TemplateSpec.ts')).toString();
}

export class MochaGenerator {

    constructor() {
        this.initMustacheTemplates();
    }

    public generate(requests: HttpRequest[]) {
        // console.log(requests);

        this.generateRequestStub(requests);
        this.generateRequestSpec(requests);
    }

    private generateRequestStub(requests: HttpRequest[]) {

        const methods = this.generateMethodsFromRequests(requests);

        const classPrefix = this.generateClassPrefix();
        const fileName =  classPrefix + 'Stub.ts';

        this.render(fileName, Templates.TemplateStub, {
            classPrefix,
            stubMethods: methods,
        } as IStubView);
    }

    private generateRequestSpec(requests: HttpRequest[]) {

        const methods = this.generateMethodsFromRequests(requests);

        const classPrefix = this.generateClassPrefix();
        const fileName =  classPrefix + 'Spec.ts';

        this.render(fileName, Templates.TemplateSpec, {
            classPrefix,
            stubMethods: methods,
        } as IStubView);

    }

    private render(fileName: string, template: string, variables: any) {
        const output = Mustache.render(template, variables);
        fs.writeFileSync(path.join(outputDirPath, fileName), output);
    }

    private generateClassPrefix(){
        const raw = camel(dockerNames.getRandomName());
        return raw.charAt(0).toLocaleUpperCase() + raw.slice(1);
    }

    private generateMethodsFromRequests(requests: HttpRequest[]): IStubMethod[] {
        return _.map(requests, (req) => {
            return {
                name: camel(req.url),
                params: 'arg0: any, arg1: any, arg2: any',
                returnType: ': HttpRequest', // : is mandatory
                returnValue: JSON.stringify(req, null, 2),
            };
        });
    }

    private initMustacheTemplates() {
        const customTags = ['/*<', '>*/'];
        Mustache.parse(Templates.TemplateSpec, customTags);
        Mustache.parse(Templates.TemplateStub, customTags);
    }
}
