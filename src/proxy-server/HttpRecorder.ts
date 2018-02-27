import * as _ from 'lodash';
import * as express from 'express';
import { HttpRequest } from './HttpRequest';
import { IncomingMessage } from 'http';
import { URL } from 'url';
import * as fs from 'fs';

export class HttpRecorder {

    private requests: HttpRequest[] = [];

    public registerRequest(req: IncomingMessage) {

        if (!req.url) {
            console.log('Warning, URL is not defined');
            return;
        }

        const url = new URL(req.url);

        this.requests.push({
            url: req.url,
            protocol: url.protocol,
            host: url.host,
            headers: req.headers,
            method: req.method as any,
            expectedResponse: {} as any,
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

    public persistRequests(path: string) {
        fs.writeFileSync(path, JSON.stringify(this.requests, null, 2));
    }
}