import * as express from 'express';
import {Express} from 'express';
import * as fs from 'fs';
import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as https from 'https';
import {printError, printInfo} from '../common/print';
import {Utils} from '../common/Utils';
import {HttpRecorder} from './HttpRecorder';
import {HttpConnectListener} from "./HttpConnectListener";

const httpProxy = require('http-proxy');

export interface IAugmentedIncomingMessage extends IncomingMessage {
    messageId: string;
}

export interface IAugmentedServerResponse extends ServerResponse {
    req: IAugmentedIncomingMessage;
}

export class HttpProxyServer {

    private HTTP_PORT = 63000;
    private HTTPS_PORT = 63001;

    private httpsServer: https.Server;
    private httpsApp: Express;
    private httpsProxy: any;

    private httpServer: http.Server;
    private httpApp: Express;
    private httpProxy: any;

    private recorder: HttpRecorder;

    constructor(recorder: HttpRecorder) {
        this.recorder = recorder;
        this.setupHttpProxy();
        this.setupHttpServer();

        // FIXME: NOT FUNCTIONNAL
        // TODO: retry with a simpler proxy instanciation (see node-http-proxy README)
        this.setupHttpsProxy();
        this.setupHttpsServer();
    }

    /**
     * Start listening and serve requests
     */
    public listen() {
        return this.listenHttp().then(() => {
            return this.listenHttps.bind(this);
        });
    }

    private setupHttpProxy() {

        this.httpProxy = httpProxy.createProxyServer();
        this.httpProxy.on('error', this.onProxyError.bind(this));
        this.httpProxy.on('proxyReq', this.onProxyRequest.bind(this));
        this.httpProxy.on('proxyRes', this.onProxyResponse.bind(this));
    }

    private setupHttpsProxy() {

        // this.httpsServer.on('connect', function (){
        //
        // })

        this.httpsProxy = httpProxy.createProxyServer({
            secure: false,
        });
        this.httpsProxy.on('error', this.onProxyError.bind(this));
        this.httpsProxy.on('proxyReq', this.onProxyRequest.bind(this));
        this.httpsProxy.on('proxyRes', this.onProxyResponse.bind(this));

    }

    private listenHttp(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.httpServer.listen(this.HTTP_PORT, () => {
                printInfo(`Proxy listening HTTP on port ${this.HTTP_PORT}`);
                resolve();
            });
        });
    }

    private listenHttps(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.httpsServer) {
                this.httpsServer.listen(this.HTTPS_PORT, () => {
                    printInfo(`Listening HTTPS on port ${this.HTTPS_PORT}`);
                    printInfo(`HTTPS proxy is not functional, this is a work in progress...`);
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    private setupHttpServer() {

        this.httpApp = express();

        this.httpServer = http.createServer(this.httpApp);
        new HttpConnectListener().registerListener(this.httpServer);

        this.httpApp.all('*', this.proxyRequestHandler.bind(this));
    }

    private setupHttpsServer() {
        this.httpsApp = express();
        this.httpsApp.all('*', this.proxyRequestHandler.bind(this));

        const options = {
            key: fs.readFileSync('./ssl/localhost/key.pem'),
            cert: fs.readFileSync('./ssl/localhost/cert.pem'),
        };

        this.httpsServer = https.createServer(options, this.httpsApp);
    }

    private proxyRequestHandler(req: express.Request, res: express.Response) {
        const target = req.protocol + '://' + req.get('host');

        this.printRequest(req);
        this.httpProxy.web(req, res, {target});
    }

    private onProxyError(e: Error) {
        printError(`Proxy error: ${e.message}`, e);
    }

    private onProxyRequest(proxyReq: IncomingMessage, req: IncomingMessage, res: IAugmentedServerResponse) {
        try {
            this.recorder.registerRequest(proxyReq, req);
        } catch (e) {
            printError('Recording error on request:', e);
        }
    }

    private onProxyResponse(proxyRes: IncomingMessage, req: IncomingMessage, res: IAugmentedServerResponse) {
        try {
            this.recorder.registerResponse(proxyRes, res);
        } catch (e) {
            printError('Recording error on response:', e);
        }
    }

    public persistRequests(path: string) {
        this.recorder.persistRequests(path);
    }

    public getRequests() {
        return this.recorder.getRequests();
    }

    private printRequest(req: express.Request) {
        printInfo(`Forwarding request: ${req.method} - ${Utils.limitStringSize(req.url, 120)}`);
    }
}
