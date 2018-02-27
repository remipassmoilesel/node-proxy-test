import { HttpRequest } from "../proxy-server/HttpRequest";

export interface ITestGeneratorHook {
    beforeTestGeneration(request: HttpRequest): IMethodArgument[] | void;
}

export interface IMethodArgument {
    name: string;
    type: string;
    defaultValue: any;
}
