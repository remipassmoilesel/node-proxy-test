// tslint:disable:no-console
import {wait} from "f-promise";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import {printInfo} from "./common/common";
import {ITestGeneratorHook} from "./hooks/hookTypes";
import {HttpProxyServer} from "./proxy-server/HttpProxyServer";
import {HttpRequest} from "./proxy-server/HttpRequest";
import {MochaGenerator} from "./test-generator/MochaGenerator";

const {prompt} = require("prompts");

const allHooks: ITestGeneratorHook[] = []; // [new UserAgentHook(), new AcceptEncodingHook()];

export class CliActions {

    private httpServer: HttpProxyServer;

    public recordHttpRequests() {
        this.listenQuitSequence();
        this.httpServer = new HttpProxyServer();
        this.httpServer.listen();
    }

    public generateTests(fileName: string) {
        const generator = new MochaGenerator(allHooks);
        generator.generate(this.readRequests(fileName));
    }

    public playTests() {
        throw new Error("Not implemented");
    }

    public printHelp() {
        printInfo("record:        Open a proxy and record http requests, then generate tests");
        printInfo("generate:      Generate Typescript/Mocha tests");
        printInfo("play:          Play tests");
    }

    public showPrompt() {

        // TODO: use prompt (and not prompts)
        const response = wait(prompt({
            type: "number",
            name: "choice",
            message:
                `What do you want to do ?
    - 1 > Launch a proxy to record your activity (http only)
    - 2 > Generate Typescript/Mocha tests with recorded activity
    - 3 > Execute these tests
    - 4 > Quit
    `,
        }));

        if (response === 4) {
            process.exit(0);
        }
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
}
