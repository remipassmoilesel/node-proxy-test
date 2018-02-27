import * as Mustache from 'mustache';
import { HttpRequest } from '../proxy-server/HttpRequest';
import * as fs from 'fs';
import * as path from 'path';

const dockerNames = require('docker-names');

const templateDirPath = path.resolve(__dirname, '..', '..', 'src', 'templates');
const outputDirPath = path.resolve(__dirname, '..', '..', 'src', 'generated-tests');

const camel = require('to-camel-case');

class Templates {
    public static TemplateStub = fs.readFileSync(path.join(templateDirPath, 'TemplateStub.ts')).toString();
    public static TemplateSpec = fs.readFileSync(path.join(templateDirPath, 'TemplateSpec.ts')).toString();
}

export class MochaGenerator {

    public generate(requests: HttpRequest[]) {
        // console.log(requests);

        this.generateRequestStub(requests);
        this.generateRequestSpec(requests);
    }

    private generateRequestStub(requests: HttpRequest[]) {
        const fileName = this.generateStubName();
        this.render(fileName, Templates.TemplateStub, {});
    }

    private generateRequestSpec(requests: HttpRequest[]) {
        const fileName = this.generateSpecName();
        this.render(fileName, Templates.TemplateSpec, {});
    }

    private render(fileName: string, template: string, variables: any){
        const customTags = [ '/*<', '>*/' ];
        const output = Mustache.render(template, variables, customTags);

        fs.writeFileSync(path.join(outputDirPath, fileName), output);
    }

    private generateSpecName(){
        const raw = camel(dockerNames.getRandomName()) + 'Spec.ts';
        return raw.charAt(0).toLocaleUpperCase() + raw.slice(1);
    }

    private generateStubName(){
        const raw = camel(dockerNames.getRandomName()) + 'Stub.ts';
        return raw.charAt(0).toLocaleUpperCase() + raw.slice(1);
    }
}
