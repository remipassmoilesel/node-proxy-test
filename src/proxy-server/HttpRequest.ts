export type HttpMethod =
    'GET'
    | 'HEAD'
    | 'OPTIONS'
    | 'POST'
    | 'DELETE'
    | 'PUT'
    | ' OPTION'
    | 'CONNECT'
    | ' TRACE'
    | ' PATH';

export type AssertHandler = (request: HttpRequest) => void;

export class ResponseDetails {
    public body: any;
    public headers: any;
}

export class RequestDetails {
    public body: any;
    public headers: any;
}

export class HttpRequest {

    public url: string;
    public host: string;
    public protocol: string;
    public statusCode: number;
    public method: HttpMethod;

    public request: RequestDetails;
    public response: ResponseDetails;

    public assert?: AssertHandler;

}
