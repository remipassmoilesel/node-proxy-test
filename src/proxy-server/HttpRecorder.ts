import * as fs from "fs";
import {IncomingMessage, ServerResponse} from "http";
import * as _ from "lodash";
import {URL} from "url";
import {printInfo} from "../common/common";
import {HttpRequest} from "./HttpRequest";

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

    public registerResponse(proxyRes: IncomingMessage, res: ServerResponse) {
        const req: HttpRequest = this.findRequestForResponse(res);
        req.expectedResponse = {code: res.statusCode};

        // TODO: skip binary data with headers, e.g: accept "image/webp,image/apng,image/*,*/*;q=0.8",
        proxyRes.on('data', function (dataBuffer) {
            req.body = dataBuffer.toString();
        });

    }

    public getRequests() {
        return this.requests;
    }

    private findRequestForResponse(res: ServerResponse): HttpRequest {
        const correspondingReq = _.find(this.requests, (req: HttpRequest) => {
            return this.isResponseOfRequest(res, req);
        });
        if (!correspondingReq) {
            throw new Error("Not found !");
        }
        return correspondingReq;
    }

    private isResponseOfRequest(res: ServerResponse, req: HttpRequest): boolean {
        // type error
        return (res as any).req.url === req.url;
    }

    public persistRequests(path: string) {
        fs.writeFileSync(path, JSON.stringify(this.requests, null, 2));
    }
}
