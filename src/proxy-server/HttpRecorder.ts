import * as express from "express";
import * as fs from "fs";
import { IncomingMessage } from "http";
import * as _ from "lodash";
import { URL } from "url";
import { printInfo } from "../common";
import { HttpRequest } from "./HttpRequest";

export class HttpRecorder {

    private requests: HttpRequest[] = [];

    public registerRequest(req: IncomingMessage) {

        if (!req.url) {
            printInfo("Warning, URL is not defined");
            return;
        }

        const url = new URL(req.url);

        this.requests.push({
            url: req.url,
            protocol: url.protocol,
            host: url.host,
            headers: req.headers,
            method: req.method as any,
            expectedResponse: null,
        });
    }

    public registerResponse(res: express.Response) {
        const req: HttpRequest = this.findRequestForResponse(res);
        req.expectedResponse = { code: res.statusCode };
    }

    public getRequests() {
        return this.requests;
    }

    private findRequestForResponse(res: express.Response): HttpRequest {
        const correspondingReq = _.find(this.requests, (req: HttpRequest) => {
            return this.isResponseOfRequest(res, req);
        });
        if (!correspondingReq) {
            throw new Error("Not found !");
        }
        return correspondingReq;
    }

    private isResponseOfRequest(res: any, req: HttpRequest): boolean {
        return res.req.url === req.url;
    }

    public persistRequests(path: string) {
        fs.writeFileSync(path, JSON.stringify(this.requests, null, 2));
    }
}
