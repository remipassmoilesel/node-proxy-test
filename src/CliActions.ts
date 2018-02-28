// tslint:disable:no-console
import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import * as readline from 'readline';
import { printError, printInfo, printWarning } from './common/common';
import { Constants } from './common/Constants';
import { Utils } from './common/Utils';
import { AbstractHttpRecordingHook } from './hooks/lib/AbstractHttpRecordingHook';
import { AbstractTestGenerationHook } from './hooks/lib/AbstractTestGenerationHook';
import {HttpProxyServer} from './proxy-server/HttpProxyServer';
import { HttpRecorder } from './proxy-server/HttpRecorder';
import {HttpRequest} from './proxy-server/HttpRequest';
import {MochaGenerator} from './test-generator/MochaGenerator';

export class CliActions {

    private testGenerationHooks: AbstractTestGenerationHook[];
    private httpRecordingHooks: AbstractHttpRecordingHook[];

    constructor(testGenerationHooks: AbstractTestGenerationHook[], httpRecordingHook: AbstractHttpRecordingHook[]) {
        this.testGenerationHooks = testGenerationHooks;
        this.httpRecordingHooks = httpRecordingHook;
    }

    private httpServer: HttpProxyServer;

    public printHelp() {
        printInfo('record:        Open a proxy and record http requests, then generate tests');
        printInfo('generate:      Generate Typescript/Mocha tests');
    }

    public recordHttpRequests() {

        printInfo('Starting HTTP request recorder');
        printInfo('');

        this.showHttpRecordindHooks();

        this.listenQuitSequence();
        const recorder = new HttpRecorder(this.httpRecordingHooks);
        this.httpServer = new HttpProxyServer(recorder);
        this.httpServer.listen();
    }

    public generateTests(filePathOrNumber: string) {

        printInfo('Starting test generation');
        printInfo('');

        this.showTestGenerationHooks();

        if (!filePathOrNumber) {
            this.showRecordedFiles();
            printError('');
            printError('File path is mandatory.');
            process.exit(1);
        }

        const generator = new MochaGenerator(this.testGenerationHooks);

        let filePath = '';
        try{
            const fileNumber: number = Number(filePathOrNumber);
            filePath = path.join(Constants.RECORDED_DIR, this.listRecordedFiles()[fileNumber]);
        } catch (e){
            filePath = filePathOrNumber;
        }

        printInfo(`Generating test from: ${filePath}`);
        generator.generate(this.readRequests(filePath));
        printInfo(`Generated !`);
    }

    public showRecordedFiles() {
        printInfo('Available records: ');
        const files = this.listRecordedFiles();
        if (files.length < 0){
            printWarning('No record found in directory: ' + Constants.RECORDED_DIR);
            return;
        }
        _.forEach(files, (file, index) => {
            printInfo(`${index}: ${file}`);
        });
    }

    private readRequests(requestsJsonPath: string): HttpRequest[] {
        return JSON.parse(fs.readFileSync(requestsJsonPath).toString());
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

        if (this.httpServer.getRequests().length < 1) {
            printWarning('');
            printWarning(`No request to record.`);
            return;
        }

        const recordedRequestsJson = path.join('recorded/', new Date().toISOString() + '.json');
        this.httpServer.persistRequests(recordedRequestsJson);
        printInfo('');
        printInfo(`${this.httpServer.getRequests().length} requests were saved at location: ${recordedRequestsJson}`);
    }

    private listRecordedFiles(): string[] {
        const recorded = fs.readdirSync(Constants.RECORDED_DIR);
        return _.filter(recorded, (file) => file !== '.gitkeep');
    }

    private showHttpRecordindHooks() {
        if (this.httpRecordingHooks.length > 0){
            printWarning('Using http recording hooks: ');
            _.forEach(this.httpRecordingHooks, (hook: AbstractHttpRecordingHook) => {
                printWarning(Utils.getObjectConstructorName(hook));
            });
            printWarning('');
        }
    }

    private showTestGenerationHooks() {
        if (this.testGenerationHooks.length > 0){
            printWarning('Using test generation hooks: ');
            _.forEach(this.testGenerationHooks, (hook: AbstractTestGenerationHook) => {
                printWarning(Utils.getObjectConstructorName(hook));
            });
            printWarning('');
        }
    }

}
