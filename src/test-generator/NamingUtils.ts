const STUB_SUFFIX = 'Stub';
const SPEC_SUFFIX = 'Spec';

export class NamingUtils {
    public static getStubClassName(classPrefix: string) {
        return classPrefix + STUB_SUFFIX;
    }

    public static getSpecClassName(classPrefix: string) {
        return classPrefix + SPEC_SUFFIX;
    }

    public static getMethodCall(methodSuffix: string) {
        return `stub.request_${methodSuffix}();`
    }
}