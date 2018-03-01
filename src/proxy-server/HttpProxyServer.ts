import * as express from 'express';
import {Express} from 'express';
import * as fs from 'fs';
import {IncomingMessage, ServerResponse} from 'http';
import * as https from 'https';
import {printError, printInfo} from '../common/print';
import {Utils} from '../common/Utils';
import {HttpRecorder} from './HttpRecorder';

const httpProxy = require('http-proxy');

export interface IAugmentedServerResponse extends ServerResponse {
    req: IncomingMessage;
}

export class HttpProxyServer {

    private HTTP_PORT = 3000;
    private HTTPS_PORT = 3001;

    private httpsServer: https.Server;
    private httpsApp: Express;
    private httpsProxy: any;

    private httpProxy: any;
    private httpApp: Express;

    private recorder: HttpRecorder;

    constructor(recorder: HttpRecorder) {
        this.recorder = recorder;
        this.setupHttpProxy();
        this.setupHttpServer();

        // NOT FUNCTIONNAL
        this.setupHttpsProxy();
        this.setupHttpsServer();
    }

    public setupHttpProxy() {

        this.httpProxy = httpProxy.createProxyServer();
        this.httpProxy.on('error', this.onProxyError.bind(this));
        this.httpProxy.on('proxyReq', this.onProxyRequest.bind(this));
        this.httpProxy.on('proxyRes', this.onProxyResponse.bind(this));

    }

    public setupHttpsProxy() {

        this.httpsProxy = httpProxy.createProxyServer({
            secure: false,
        });
        this.httpsProxy.on('error', this.onProxyError.bind(this));
        this.httpsProxy.on('proxyReq', this.onProxyRequest.bind(this));
        this.httpsProxy.on('proxyRes', this.onProxyResponse.bind(this));

    }

    /**
     * Start listening and serve requests
     */
    public listen() {
        this.httpApp.listen(this.HTTP_PORT, () => {
            printInfo(`Listening HTTP on port ${this.HTTP_PORT}`);
        });

        if (this.httpsServer) {
            this.httpsServer.listen(this.HTTPS_PORT, () => {
                printInfo(`Listening HTTPS on port ${this.HTTPS_PORT}`);
            });
        }

    }

    private setupHttpServer() {
        this.httpApp = express();
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
        printInfo(`Forwarding request: ${Utils.limitStringSize(req.url, 120)}`);
    }
}
