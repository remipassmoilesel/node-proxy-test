export interface IRequestsMethod {
    nameSuffix: string;
    defaultValues: string[];
    params: string;
    returnType: string;
    returnValue: string;
}

export interface IRequestsView {
    classPrefix: string;
    className: string;
    requestsMethods: IRequestsMethod[];
}

export interface IMethodCall {
    methodCall: string;
}

export interface ISpecView {
    requestsInstantiation: string;
    requestsMethodCalls: IMethodCall[];
    requestsImport: string;
}
