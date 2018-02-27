export interface IStubMethod{
    nameSuffix: string;
    params: string;
    returnType: string;
    returnValue: string;
}

export interface IStubView {
    classPrefix: string;
    className: string;
    stubMethods: IStubMethod[];
}

export interface IMethodCall{
    methodCall: string;
}

export interface ISpecView {
    stubInstantiation: string;
    stubMethodCalls: IMethodCall[];
    stubImport: string;
}
