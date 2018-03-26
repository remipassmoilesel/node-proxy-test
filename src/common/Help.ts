import * as _ from 'lodash';
import {printInfo} from './print';

export interface ICommandDescription {
    example: string;
    description: string;
}

export class Help {
    private static commands: ICommandDescription[] = [
        {
            example: 'node-proxy-test record',
            description: 'Launch recording proxy',
        },
        {
            example: 'node-proxy-test launch-chromium',
            description: 'Launch Chromium browser (must be installed first)',
        },
        {
            example: 'node-proxy-test generate 4',
            description: 'Generate Typescript/Mocha tests from recorded HTTP requests',
        },
        {
            example: 'node-proxy-test generate /path/to/file.json',
            description: 'Generate Typescript/Mocha tests from recorded HTTP requests',
        },
        {
            example: 'node-proxy-test run',
            description: 'Run generated tests',
        },
        {
            example: 'node-proxy-test clean-generated',
            description: 'Clean generated tests',
        },
    ];


    public static printCliHelp() {

        printInfo(`** node-proxy-test **`);
        printInfo(``);

        printInfo(`Command examples: `);
        printInfo(``);

        _.forEach(Help.commands, (comm) => {
            printInfo(`   ${comm.description}: `);
            printInfo(`     $ ${comm.example}`);
            printInfo(``);
        });
    }

    public static printRecordingHelp() {
        printInfo('CTRL + C:    Stop recording and persist requests');
        printInfo('s:           Enable/disable http recording');
    }

}
