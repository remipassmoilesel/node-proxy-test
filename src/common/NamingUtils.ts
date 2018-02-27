const STUB_SUFFIX = "Stub";
const SPEC_SUFFIX = "Spec";

export class NamingUtils {
    public static getStubClassName(classPrefix: string) {
        return classPrefix + STUB_SUFFIX;
    }

    public static getSpecClassName(classPrefix: string) {
        return classPrefix + SPEC_SUFFIX;
    }

    public static getMethodCall(methodSuffix: string, defaultValuesStr?: string[]): string {
        let values = "";
        if (defaultValuesStr && defaultValuesStr.length > 0) {
            values += defaultValuesStr.join(", ");
        }
        return `stub.request_${methodSuffix}(${values});`;
    }
}
