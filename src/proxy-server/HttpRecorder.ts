import * as fs from "fs";
import {IncomingMessage, ServerResponse} from "http";
import * as _ from "lodash";
import {URL} from "url";
import {printInfo} from "../common/common";
import {HttpRequest, RequestDetails, ResponseDetails} from "./HttpRequest";
import {Utils} from "../common/Utils";

export class HttpRecorder {

    private requests: HttpRequest[] = [];

    public registerRequest(proxyReq: IncomingMessage, req: IncomingMessage) {

        if (!req.url) {
            printInfo("Warning, URL is not defined");
            return;
        }

        const url = new URL(req.url);
        const httpReq: HttpRequest = {
            url: req.url,
            host: url.host,
            protocol: url.protocol,
            method: req.method as any,
            statusCode: 0,
            request: {
                headers: req.headers,
                body: '',
            },
            response: {
                headers: {},
                body: '',
            }
        };
        this.requests.push(httpReq);

        proxyReq.on('data', (dataBuffer: Buffer) => {
            const body: string = dataBuffer.toString();
            if (!Utils.isBinaryBody(httpReq.request, body)) {
                httpReq.request.body = body;
            } else if (body) {
                httpReq.request.body = 'Body was ignored';
            }
        });

    }

    public registerResponse(proxyRes: IncomingMessage, res: ServerResponse) {
        const httpReq: HttpRequest = this.findRequestForResponse(res);
        httpReq.statusCode = res.statusCode;
        httpReq.response.headers = proxyRes.headers;

        proxyRes.on('data', (dataBuffer) => {
            const body: string = dataBuffer.toString();
            if (!Utils.isBinaryBody(httpReq.response, body)) {
                httpReq.response.body = body;
            } else if (body) {
                httpReq.request.body = 'Body was ignored';
            }
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
