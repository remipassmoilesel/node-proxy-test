import * as _ from 'lodash';
import * as express from 'express';
import { getMethodFromString, HttpMethod, HttpRequest } from './HttpRequest';
import { IncomingMessage } from 'http';
import { URL } from 'url';

export class HttpRecorder {

    private requests: HttpRequest[] = [];

    public registerRequest(req: IncomingMessage) {
        if (!req.url) {
            throw new Error('Url is undefined');
        }
        const url = new URL(req.url);
        const httpMethod: HttpMethod = getMethodFromString(req.method);

        this.requests.push({
            url: req.url,
            protocol: url.protocol,
            host: url.host,
            headers: req.headers,
            method: httpMethod,
            expectedResponse: {} as any, // response will be valorized later
        });
    }

    public registerResponse(res: express.Response) {
        const req: HttpRequest = this.findRequestForResponse(res);
        req.expectedResponse.code = res.statusCode;
    }

    public getRequests() {
        return this.requests;
    }

    private findRequestForResponse(res: express.Response): HttpRequest {
        const req = _.find(this.requests, (req: HttpRequest) => {
            return this.isResponseOfRequest(res, req);
        });
        if (!req) {
            throw new Error('Not found !');
        }
        return req;
    }

    private isResponseOfRequest(res: any, req: HttpRequest): boolean {
        return res.req.url === req.url;
    }
}