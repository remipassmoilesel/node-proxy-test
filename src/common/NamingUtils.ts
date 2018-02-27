const REQUESTS_SUFFIX = "Requests";
const SPEC_SUFFIX = "Spec";

export class NamingUtils {
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
}
