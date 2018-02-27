
export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | ' OPTION' | 'CONNECT' | ' TRACE' | ' PATH';

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
