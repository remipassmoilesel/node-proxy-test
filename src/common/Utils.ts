import * as _ from 'lodash';
import {HttpRequest, RequestDetails, ResponseDetails} from '../proxy-server/HttpRequest';
import {printError} from './print';

const REQUESTS_SUFFIX = 'Requests';
const SPEC_SUFFIX = 'Spec';

export class Utils {

    public static getRequestsClassName(classPrefix: string) {
        return classPrefix + REQUESTS_SUFFIX;
    }

    public static getSpecClassName(classPrefix: string) {
        return classPrefix + SPEC_SUFFIX;
    }

    public static isInvalidBody(body: string): boolean {
        return body.match(/\u0000|\u0013|\u0006|\u0019|\u000A|\u001D|\u007f/gi) !== null;
    }

    public static getObjectConstructorName(obj: any): string {
        return obj.constructor.name;
    }

    public static limitStringSize(str: string, maxSize: number) {
        return str.length > 120 ? str.substr(0, maxSize - 3) + '...' : str;
    }

    /**
     * Here we replace quotes on values by backticks, in order to use template strings.
     * /!\ Some values contains escaped quotes
     */
    public static stringifyRawRequests(req: HttpRequest): string {
        const rawJson = JSON.stringify(req, null, 2);
        const jsonLineWithValueRegex = /( *"[^":]+"):\s+(".+)/i;
        const jsonLines = rawJson.split('\n');

        const res = _.map(jsonLines, (line) => {
            const lineMatch = line.match(jsonLineWithValueRegex);

            if (lineMatch && lineMatch.length > 1) {
                let lineValue: string = lineMatch[2];
                if (lineValue.match(/,$/)) {
                    lineValue = lineValue.slice(0, -1);
                }
                lineValue = JSON.parse(lineValue); // remove quotes
                const quotedLineValue = '`' + lineValue + '`,';
                line = line.replace(lineMatch[2], quotedLineValue);
            }

            return line;
        });
        return res.join('\n');
    }

    public static escapeForTemplateStrings(obj: any): any {
        let strObj: string = JSON.stringify(obj);
        strObj = strObj.replace(/`/ig, '\\`');
        strObj = strObj.replace(/\$\{/ig, '\\\\${');
        return JSON.parse(strObj);
    }

    public static checkMinimumNodeVersion(minVersion: number) {
        const versionNumber = Number(process.versions.node.substr(0, 1));
        if (versionNumber < minVersion) {
            printError('');
            printError('You must use at least node 8 to run this project.');
            printError(`Current version: ${process.versions.node}`);
            printError('');
            process.exit(1);
        }
    }
}
