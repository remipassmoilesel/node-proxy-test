// tslint:disable:no-console
import * as fs from "fs";
import * as _ from "lodash";
import * as path from "path";
import * as readline from "readline";
import {printInfo} from "./common/common";
import { Constants } from "./common/Constants";
import {ITestGeneratorHook} from "./hooks/hookTypes";
import {HttpProxyServer} from "./proxy-server/HttpProxyServer";
import {HttpRequest} from "./proxy-server/HttpRequest";
import {MochaGenerator} from "./test-generator/MochaGenerator";


const allHooks: ITestGeneratorHook[] = []; // [new UserAgentHook(), new AcceptEncodingHook()];

export class CliActions {

    private httpServer: HttpProxyServer;

    public printHelp() {
        printInfo("record:        Open a proxy and record http requests, then generate tests");
        printInfo("generate:      Generate Typescript/Mocha tests");
    }

    public recordHttpRequests() {
        this.listenQuitSequence();
        this.httpServer = new HttpProxyServer();
        this.httpServer.listen();
    }

    public generateTests(filePathOrNumber: string) {
        const generator = new MochaGenerator(allHooks);

        let filePath = "";
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
        printInfo("Available records: ");
        const files = this.listRecordedFiles();
        if (files.length < 0){
            printInfo("No record found in directory: " + Constants.RECORDED_DIR);
            return;
        }
        _.forEach(files, (file, index) => {
            printInfo(`${index}: ${file}`);
        });
    }

    public showPrompt() {
        // TODO restore later
        //     const response = wait(prompt({
        //         type: "number",
        //         name: "choice",
        //         message:
        //             `What do you want to do ?
        // - 1 > Launch a proxy to record your activity (http only)
        // - 2 > Generate Typescript/Mocha tests with recorded activity
        // - 3 > Execute these tests
        // - 4 > Quit
        // `,
        //     }));
        //
        //     if (response === 4) {
        //         process.exit(0);
        //     }
    }

    private readRequests(requestsJsonPath: string): HttpRequest[] {
        return JSON.parse(fs.readFileSync(requestsJsonPath).toString());
    }

    private listenQuitSequence() {
        readline.emitKeypressEvents(process.stdin);
        if (!process.stdin.setRawMode) {
            throw new Error("process.stdin is undefined");
        }
        process.stdin.setRawMode(true);

        process.stdin.on("keypress", (str, key) => {
            if (key.ctrl && key.name === "c") {
                this.persistRequests();
                process.exit(0);
            }
        });
    }

    private persistRequests() {

        if (this.httpServer.getRequests().length < 1) {
            return;
        }

        const recordedRequestsJson = path.join("recorded/", new Date().toISOString() + ".json");
        this.httpServer.persistRequests(recordedRequestsJson);
        printInfo("Saved at: " + recordedRequestsJson);
    }

    private listRecordedFiles(): string[] {
        const recorded = fs.readdirSync(Constants.RECORDED_DIR);
        return _.filter(recorded, (file) => file !== ".gitkeep");
    }
}
