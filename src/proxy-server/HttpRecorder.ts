import * as _ from "lodash";
import * as express from "express";
import {HttpMethod, HttpRequest} from "./HttpRequest";
import {IncomingMessage} from "http";

export class HttpRecorder {

    private requests: HttpRequest[] = [];

    public registerRequest(req: IncomingMessage) {
        this.requests.push({
            url: req.url as string,
            protocol: 'https://',
            path: '/search/',
            query: '?<params>',
            host: 'nominatim.openstreetmap.org',
            headers: [],
            method: HttpMethod.GET,
            expectedResponse: {
                code: 302,
            },
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
            throw new Error('Not found !')
        }
        return req;
    }

    private isResponseOfRequest(res: any, req: HttpRequest): boolean {
        return res.req.url === req.url;
    }
}