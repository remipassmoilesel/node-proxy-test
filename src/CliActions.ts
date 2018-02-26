import {HttpProxyServer} from "./proxy-server/HttpProxyServer";
import {MochaGenerator} from "./test-generator/MochaGenerator";
import {HttpRequest} from "./proxy-server/HttpRequest";

const {prompt} = require("prompts");

console.log(prompt)

export class CliActions {

    public printHelp() {
        console.log('record:    Open a proxy and record http requests, then generate tests');
        console.log('play:      Play tests');
    }

    public async showPrompt() {

        let response = await prompt({
            type: 'number',
            name: 'choice',
            message:
                `What do you want to do ?
    - 1 > Launch a proxy to record your activity (http only)
    - 2 > Generate tests with recorded activity
    - 3 > Execute these tests
    `
        });

        console.log(response); // => 23
    }

    public recordHttpRequests() {

        const http = new HttpProxyServer();
        http.listen();

        // const socks = new SocksProxyServer();
        // socks.listen();

    }

    public generateTests() {
        const generator = new MochaGenerator();
        generator.generate(this.readRequests('path/to/json'));
    }

    public playTests() {
        throw new Error("Not implemented");
    }

    private readRequests(path: string): HttpRequest[] {
        throw new Error('Not implemented yet !');
    }

}