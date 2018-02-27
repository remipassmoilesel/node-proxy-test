export interface IStubMethod{
    name: string;
    params: string;
    returnType: string;
    returnValue: string;
}

export interface IStubView {
    classPrefix: string;
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
