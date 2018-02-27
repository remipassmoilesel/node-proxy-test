#!/usr/bin/env node

import {run} from "f-promise";
import * as _ from "lodash";
import {CliActions} from "./CliActions";
import {printInfo} from "./common/common";

const sourceMapSupport = require("source-map-support");
sourceMapSupport.install();

const versionNumber = Number(process.versions.node.substr(0, 1));
if (versionNumber < 8) {
    printInfo("You must use node 8 to run this project.");
    printInfo(`Current version: ${process.versions.node}`);
    process.exit(1);
}

const cliActions = new CliActions();
const cleanArgs = _.map(process.argv.slice(2), (arg: string) => arg.trim());

function main() {
    try {
        if (_.includes(cleanArgs, "record")) {
            cliActions.recordHttpRequests();
        }

        else if (_.includes(cleanArgs, "generate")) {
            const fileName = cleanArgs[1];
            if (!fileName) {
                throw new Error("File name or file path is mandatory");
            }
            cliActions.generateTests(fileName);
        }

        else if (_.includes(cleanArgs, "play")) {
            cliActions.playTests();
        }

        else if (_.includes(cleanArgs, "help")) {
            cliActions.printHelp();
        }

        else {
            printInfo("Bad command");
            cliActions.showPrompt();
            // process.exit(1);
        }

    } catch (e) {
        printInfo('Fatal error: ', e);
        process.exit(1);
    }
}

run(() => {
    main();
});
