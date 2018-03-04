import { IMethodArgument } from '../hooks/lib/IMethodArgument';

export interface IRequestsMethod {
    nameSuffix: string;
    defaultValues: string[];
    methodArguments: IMethodArgument[];
    methodArgumentsStr: string;
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

export interface IVariableInit {
    initLine: string;
}

export interface ISpecView {
    requestsImports: IImportLine[];
    requestsInstantiation: string;
    requestsMethodCalls: IMethodCall[];
    variablesInit: IVariableInit[];
}
