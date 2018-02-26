export enum HttpMethod {
    GET = 'GET',
    HEAD = 'HEAD',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    OPTION = 'OPTION',
    CONNECT = 'CONNECT',
    TRACE = 'TRACE',
    PATH = 'PATH'
}

export function getMethodFromString(methodStr: any): HttpMethod {
    const method: HttpMethod = <HttpMethod>HttpMethod[methodStr];
    if(!method){
        throw new Error('Method not found: ' + methodStr);
    }
    return method;
}

export type AssertHandler = (request: HttpRequest) => void;

export class Response {
    public code: number;
    public body?: any;
}

export class HttpRequest {

    public url: string;
    public host: string;
    public protocol: string;
    public headers: any;
    public method: HttpMethod;
    public body?: any;

    public expectedResponse: Response;
    public assert?: AssertHandler;

}
