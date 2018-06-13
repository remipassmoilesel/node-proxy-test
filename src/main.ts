#!/usr/bin/env node

import { run } from 'f-promise';
import * as _ from 'lodash';
import { CliActions } from './CliActions';
import {Help} from './common/Help';
import { printError } from './common/print';
import { Utils } from './common/Utils';
import { httpRecordingHooks, testGenerationHooks } from './hooks';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const sourceMapSupport = require('source-map-support');
sourceMapSupport.install();

Utils.checkMinimumNodeVersion(8);

const cliActions = new CliActions(testGenerationHooks, httpRecordingHooks);
const cleanArgs = _.map(process.argv.slice(2), (arg: string) => arg.trim());

function main() {

    try {

        if (_.includes(cleanArgs, 'launch-chromium')) {
            cliActions.launchBrowser('Chromium');
        }

        else if (_.includes(cleanArgs, 'record')) {
            cliActions.recordHttpRequests();
        }

        else if (_.includes(cleanArgs, 'generate')) {
            const fileNameOrNumber: string = cleanArgs[1];
            cliActions.generateTests(fileNameOrNumber);
        }

        else if (_.includes(cleanArgs, 'run')) {
            cliActions.runGeneratedTests();
        }

        else if (_.includes(cleanArgs, 'clean')) {
            cliActions.cleanGeneratedTests();
        }

        else if (_.includes(cleanArgs, 'help')) {
            Help.printCliHelp();
        }

        else {
            printError('');
            printError('Bad command');
            printError('');
            Help.printCliHelp();
            process.exit(1);
        }

    } catch (e) {
        printError('Fatal error: ', e);
        process.exit(1);
    }
}

run(() => {
    main();
});
