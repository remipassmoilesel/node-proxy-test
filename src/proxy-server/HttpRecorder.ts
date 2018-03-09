import * as fs from 'fs';
import {IncomingMessage} from 'http';
import * as _ from 'lodash';
import {URL} from 'url';
import * as uuid from 'uuid';
import { printInfo, printWarning } from '../common/print';
import {Utils} from '../common/Utils';
import {AbstractHttpRecordingHook} from '../hooks/models/AbstractHttpRecordingHook';
import {IAugmentedIncomingMessage, IAugmentedServerResponse} from './HttpProxyServer';
import {HttpRequest} from './HttpRequest';

export class HttpRecorder {

    private requests: HttpRequest[] = [];
    private ignoredRequests: HttpRequest[] = [];
    private hooks: AbstractHttpRecordingHook[];
    private recordingEnabled: boolean;

    constructor(hooks: AbstractHttpRecordingHook[]) {
        this.hooks = hooks;
        this.recordingEnabled = true;
    }

    public registerRequest(proxyReq: IncomingMessage, req: IncomingMessage): void {

        if (!this.recordingEnabled){
            printInfo('Request ignored, because recording is disabled');
            return;
        }

        if (!req.url) {
            printWarning('Warning, URL is not defined');
            return;
        }

        const augmentedReq: IAugmentedIncomingMessage = req as any;
        augmentedReq.messageId = uuid.v4();

        const httpReq: HttpRequest = {
            requestId: augmentedReq.messageId,
            url: req.url,
            method: req.method as any,
            statusCode: 0,
            request: {
                headers: req.headers,
                body: '',
            },
            response: {
                headers: {},
                body: '',
            },
        };

        let recordRequest = true;
        _.forEach(this.hooks, (hook: AbstractHttpRecordingHook) => {
            const hookDecision = hook.filterRequestOnSending(httpReq);
            if (hookDecision === false) {
                printWarning(`Request record ignored by hook: ${Utils.getObjectConstructorName(hook)} req=${httpReq.url}`);
                recordRequest = false;
            }
        });

        if (recordRequest) {
            this.requests.push(httpReq);

            req.on('data', (dataBuffer: Buffer) => {
                const body: string = dataBuffer.toString();

                if (!Utils.isInvalidBody(body)) {
                    httpReq.request.body += body;
                } else if (body) {
                    httpReq.request.body = 'Body was ignored';
                }
            });

        } else {
            this.ignoredRequests.push(httpReq);
        }
    }

    public registerResponse(proxyRes: IncomingMessage, res: IAugmentedServerResponse): void {

        if (!this.recordingEnabled){
            return;
        }

        if (this.isResponseIgnored(res)) {
            return;
        }

        const httpReq: HttpRequest = this.findRequestForResponse(res);
        httpReq.statusCode = res.statusCode;
        httpReq.response.headers = proxyRes.headers;

        let recordRequest = true;
        _.forEach(this.hooks, (hook: AbstractHttpRecordingHook) => {
            const hookDecision = hook.filterRequestOnReception(httpReq);
            if (hookDecision === false) {
                printWarning(`Request record ignored by hook: ${Utils.getObjectConstructorName(hook)} req=${httpReq.url}`);
                recordRequest = false;
            }
        });

        if (!recordRequest) {
            _.remove(this.requests, httpReq);
            return;
        }

        proxyRes.on('data', (dataBuffer) => {
            const body: string = dataBuffer.toString();

            if (!Utils.isInvalidBody(body)) {
                httpReq.response.body += body;
            } else if (body) {
                httpReq.response.body = `Body was ignored`;
            }
        });

    }

    public persistRequests(path: string) {
        fs.writeFileSync(path, JSON.stringify(this.requests, null, 2));
    }

    public getRequests() {
        return this.requests;
    }

    public toggleRecording(): void {
        this.recordingEnabled = !this.recordingEnabled;
    }

    public isRecording(): boolean {
        return this.recordingEnabled;
    }

    private findRequestForResponse(res: IAugmentedServerResponse): HttpRequest {
        const correspondingReq = _.findLast(this.requests, (req: HttpRequest) => {
            return this.isResponseOfRequest(res, req);
        });

        if (!correspondingReq) {
            throw new Error(`Corresponding request not found: ${JSON.stringify(res.req)}`);
        }
        return correspondingReq;
    }

    private isResponseIgnored(res: IAugmentedServerResponse): boolean {
        return !!_.findLast(this.ignoredRequests, (req) => {
            return this.isResponseOfRequest(res, req);
        });
    }

    private isResponseOfRequest(res: IAugmentedServerResponse, req: HttpRequest): boolean {
        return res.req.messageId === req.requestId;
    }

}
