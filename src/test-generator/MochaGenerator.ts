import * as Mustache from 'mustache';
import {HttpRequest} from "../proxy-server/HttpRequest";
import * as fs from "fs";
import * as path from "path";

class Templates {
    public static TemplateStub = fs.readFileSync(path.join(__dirname, '../generated-test/TemplateStub.ts')).toString();
    public static TemplateSpec = fs.readFileSync(path.join(__dirname, '../generated-test/TemplateSpec.ts')).toString();
}

export class MochaGenerator {

    public generate(requests: HttpRequest[]) {
        // console.log(requests);

        this.generateRequestStub(requests);
        this.generateRequestSpec(requests);
    }

    private generateRequestStub(requests: HttpRequest[]) {
        const view = {};
        const output = Mustache.render(Templates.TemplateStub, view);
        fs.writeFileSync(path.join(__dirname, '../generated-test/FirstStub.ts'), output)
    }

    private generateRequestSpec(requests: HttpRequest[]) {

    }
}
