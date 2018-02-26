#!/usr/bin/env node

import * as _ from "lodash";
import {printInfo} from "./common";
import {CliActions} from "./CliActions";

const sourceMapSupport = require('source-map-support');
sourceMapSupport.install();

const cliActions = new CliActions();
const cleanArgs = _.map(process.argv.slice(2), (arg: string) => arg.trim());

(async () => {

    try {
        if (_.includes(cleanArgs, "record")) {
            cliActions.recordHttpRequests();
        }

        else if (_.includes(cleanArgs, "generate-tests")) {
            cliActions.generateTests();
        }

        else if (_.includes(cleanArgs, "play")) {
            cliActions.playTests();
        }

        else if (_.includes(cleanArgs, "help")) {
            cliActions.printHelp();
        }

        else {
            printInfo("Bad command");
            await cliActions.showPrompt();
            // process.exit(1);
        }

    } catch (e) {
        console.error(e);
        process.exit(1);
    }

})();
