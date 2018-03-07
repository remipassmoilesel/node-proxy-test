// tslint:disable:no-console
import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import * as readline from 'readline';
import { Constants } from './common/Constants';
import { printError, printInfo, printWarning } from './common/print';
import { Utils } from './common/Utils';
import { AbstractHttpRecordingHook } from './hooks/models/AbstractHttpRecordingHook';
import { AbstractTestGenerationHook } from './hooks/models/AbstractTestGenerationHook';
import { HttpProxyServer } from './proxy-server/HttpProxyServer';
import { HttpRecorder } from './proxy-server/HttpRecorder';
import { HttpRequest } from './proxy-server/HttpRequest';
import { MochaGenerator } from './test-generator/MochaGenerator';

export class CliActions {

    private testGenerationHooks: AbstractTestGenerationHook[];
    private httpRecordingHooks: AbstractHttpRecordingHook[];
    private httpServer: HttpProxyServer;
    private httpRecorder: HttpRecorder;

    constructor(testGenerationHooks: AbstractTestGenerationHook[], httpRecordingHook: AbstractHttpRecordingHook[]) {
        this.testGenerationHooks = testGenerationHooks;
        this.httpRecordingHooks = httpRecordingHook;
    }

    public printCliHelp() {
        printInfo('record:        Open a proxy and record http requests, then generate tests');
        printInfo('generate:      Generate Typescript/Mocha tests');
    }

    public printRecordingHelp() {
        printInfo('CTRL + C:    Stop recording and persist requests');
        printInfo('s:           Enable/disable http recording');
    }

    public recordHttpRequests() {

        printInfo('Starting HTTP request recorder');
        printInfo('');

        this.showHttpRecordindHooks();

        this.listenKeypress();
        this.httpRecorder = new HttpRecorder(this.httpRecordingHooks);
        this.httpServer = new HttpProxyServer(this.httpRecorder);
        this.httpServer.listen().then(() => {
            this.printRecordingHelp();
        });
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
        try {
            const fileNumber: number = Number(filePathOrNumber);
            filePath = path.join(Constants.RECORDED_DIR, this.listRecordedFiles()[fileNumber]);
        } catch (e) {
            filePath = filePathOrNumber;
        }

        printInfo(`Generating test from: ${filePath}`);
        const filename = generator.generate(this.readRequests(filePath));
        printInfo(`Generated ! See: ${filename}`);
    }

    public showRecordedFiles() {
        printInfo('Available records: ');
        const files = this.listRecordedFiles();
        if (files.length < 0) {
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

    private listenKeypress() {
        readline.emitKeypressEvents(process.stdin);
        if (!process.stdin.setRawMode) {
            throw new Error('process.stdin is undefined');
        }
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', this.handleKeyPress.bind(this));
    }

    private handleKeyPress(str: string, key: any) {
        if (key.ctrl && key.name === 'c') {
            this.persistRequests();
            process.exit(0);
        }
        else if (key.name === 's') {
            this.toggleRecording();
        }
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
        printInfo(`${this.httpServer.getRequests().length} request(s) were saved at location: ${recordedRequestsJson}`);
    }

    private listRecordedFiles(): string[] {
        const recorded = fs.readdirSync(Constants.RECORDED_DIR);
        return _.filter(recorded, (file) => file !== '.gitkeep');
    }

    private showHttpRecordindHooks() {
        if (this.httpRecordingHooks.length > 0) {
            printWarning('Using http recording hooks: ');
            _.forEach(this.httpRecordingHooks, (hook: AbstractHttpRecordingHook) => {
                printWarning(Utils.getObjectConstructorName(hook));
            });
            printWarning('');
        }
    }

    private showTestGenerationHooks() {
        if (this.testGenerationHooks.length > 0) {
            printWarning('Using test generation hooks: ');
            _.forEach(this.testGenerationHooks, (hook: AbstractTestGenerationHook) => {
                printWarning(Utils.getObjectConstructorName(hook));
            });
            printWarning('');
        }
    }

    private toggleRecording() {
        const oldStateStr: string = this.httpRecorder.isRecording() ? 'ENABLED' : 'DISABLED';
        const newStateStr: string = !this.httpRecorder.isRecording() ? 'ENABLED' : 'DISABLED';

        printInfo(`Recording state was: ${oldStateStr}`);
        this.httpRecorder.toggleRecording();
        printWarning(`Recording state become: ${newStateStr}`);
    }

}
