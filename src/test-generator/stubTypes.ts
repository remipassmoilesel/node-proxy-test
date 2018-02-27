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