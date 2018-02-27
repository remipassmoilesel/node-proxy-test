import {RequestDetails, ResponseDetails} from "../proxy-server/HttpRequest";

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

        const contentType: string | undefined = request.headers['content-type'];
        const contentEncoding: string | undefined = request.headers['content-encoding'];

        if (contentType && contentType.match(/(image|stream)/gi)) {
            return true;
        }
        if (contentEncoding && contentEncoding.match(/zip/gi)) {
            return true;
        }
        if (contentEncoding && contentEncoding.match(/zip/gi)) {
            return true;
        }

        return false;
    }
}
