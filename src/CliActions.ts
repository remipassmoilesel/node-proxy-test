import { HttpProxyServer } from './proxy-server/HttpProxyServer';
import { MochaGenerator } from './test-generator/MochaGenerator';
import { HttpRequest } from './proxy-server/HttpRequest';
import * as path from 'path';
import * as readline from 'readline';
import * as fs from 'fs';

const { prompt } = require('prompts');

export class CliActions {

    private httpServer: HttpProxyServer;

    public async recordHttpRequests() {
        this.listenQuitSequence();
        this.httpServer = new HttpProxyServer();
        this.httpServer.listen();
    }

    public generateTests(fileName: string) {
        const generator = new MochaGenerator();
        generator.generate(this.readRequests(fileName));
    }

    public playTests() {
        throw new Error('Not implemented');
    }

    private readRequests(path: string): HttpRequest[] {
        return JSON.parse(fs.readFileSync(path).toString());
    }


    public printHelp() {
        console.log('record:        Open a proxy and record http requests, then generate tests');
        console.log('generate:      Generate Typescript/Mocha tests');
        console.log('play:          Play tests');
    }

    public async showPrompt() {

        // TODO: use prompt (and not prompts)
        let response = await prompt({
            type: 'number',
            name: 'choice',
            message:
                `What do you want to do ?
    - 1 > Launch a proxy to record your activity (http only)
    - 2 > Generate Typescript/Mocha tests with recorded activity
    - 3 > Execute these tests
    - 4 > Quit
    `
        });

        if (response === 4) {
            process.exit(0);
        }
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