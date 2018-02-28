import * as _ from "lodash";
import { HttpRequest, RequestDetails, ResponseDetails } from "../proxy-server/HttpRequest";

const REQUESTS_SUFFIX = "Requests";
const SPEC_SUFFIX = "Spec";

export class Utils {

    public static getRequestsClassName(classPrefix: string) {
        return classPrefix + REQUESTS_SUFFIX;
    }

    public static getSpecClassName(classPrefix: string) {
        return classPrefix + SPEC_SUFFIX;
    }

    public static getRequestsMethodCall(methodSuffix: string, defaultValuesStr?: string[]): string {
        let values = "";
        if (defaultValuesStr && defaultValuesStr.length > 0) {
            values += defaultValuesStr.join(", ");
        }
        return `runRequest(requests.request_${methodSuffix}(${values}));`;
    }

    public static isBinaryBody(request: RequestDetails | ResponseDetails, body: string): boolean {

        const contentType: string | undefined = request.headers["content-type"];
        const contentEncoding: string | undefined = request.headers["content-encoding"];

        if (contentType && contentType.match(/(image|stream)/gi)) {
            return true;
        }
        if (contentEncoding && contentEncoding.match(/zip/gi)) {
            return true;
        }

        return false;
    }

    public static getObjectConstructorName(obj: any): string {
        return obj.constructor.name;
    }

    /**
     * Here we replace quotes on values by backticks, in order to use template strings.
     * /!\ Some values contains escaped quotes
     */
    public static stringifyRawRequests(req: HttpRequest): string {
        const rawJson = JSON.stringify(req, null, 2);
        const jsonLineWithValueRegex = /( *"[^":]+"):\s+(".+)/i;
        const jsonLines = rawJson.split("\n");

        const res = _.map(jsonLines, (line) => {
            const lineMatch = line.match(jsonLineWithValueRegex);

            if (lineMatch && lineMatch.length > 1) {
                let lineValue: string = lineMatch[2];
                if (lineValue.match(/,$/)) {
                    lineValue = lineValue.slice(0, -1);
                }
                lineValue = JSON.parse(lineValue); // remove quotes
                const quotedLineValue = "`" + lineValue + "`,";
                line = line.replace(lineMatch[2], quotedLineValue);
            }

            return line;
        });
        return res.join("\n");
    }

    public static escapeForTemplateStrings(obj: any): any {
        let strObj: string = JSON.stringify(obj);
        strObj = strObj.replace(/`/ig, "\\`");
        strObj = strObj.replace(/\$\{/ig, "\\\\${");
        return JSON.parse(strObj);
    }

}
