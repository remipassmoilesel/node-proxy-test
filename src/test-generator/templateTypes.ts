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

export interface IImportLine {
    importLine: string;
}

export interface ISpecView {
    requestsImports: IImportLine[];
    requestsInstantiation: string;
    requestsMethodCalls: IMethodCall[];
}
