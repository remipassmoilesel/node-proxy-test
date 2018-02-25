export enum HttpMethod {
    GET, POST, DELETE, PUT, OPTION, CONNECT, TRACE, PATH
}

export type AssertHandler = (request: HttpRequest) => void;

export class Response {
    public code: number;
    public body?: any;
}

export class HttpRequest {

    public host: string;
    public protocol: string;
    public path: string;
    public query: string;
    public headers: any;
    public method: HttpMethod;
    public body?: any;

    public expectedResponse: Response;
    public assert?: AssertHandler;

}
