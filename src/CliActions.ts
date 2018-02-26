import {HttpProxyServer} from "./proxy-server/HttpProxyServer";
import {MochaGenerator} from "./test-generator/MochaGenerator";
import {HttpRequest} from "./proxy-server/HttpRequest";
import * as path from "path";
import * as readline from 'readline';

const {prompt} = require("prompts");

export class CliActions {

    private httpServer: HttpProxyServer;

    public async recordHttpRequests() {
        this.listenQuitSequence();
        this.httpServer = new HttpProxyServer();
        this.httpServer.listen();
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

        console.log(response);
    }

    private listenQuitSequence() {
        readline.emitKeypressEvents(process.stdin);
        if (!process.stdin.setRawMode) {
            throw new Error('process.stdin is undefined');
        }
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                this.persistRequests();
                process.exit(0);
            }
        });
    }

    private persistRequests() {
        const recordedRequestsJson = path.join('recorded/', new Date().toISOString() + '.json');
        this.httpServer.persistRequests(recordedRequestsJson);
        console.log('Saved at: ' + recordedRequestsJson);
    }
}