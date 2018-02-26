///<reference path="HttpRecorder.ts"/>
import {printInfo} from "../common";
import * as express from 'express';
import {Express} from 'express';
import * as fs from "fs";
import * as https from "https";
import {HttpRecorder} from "./HttpRecorder";
import {IncomingMessage, ServerResponse} from "http";
import {Url} from "url";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

interface IHandlerOptions {
    target: Url;
    secure: boolean;
    prependPath: boolean;
}

const httpProxy = require("http-proxy");

export class HttpProxyServer {

    private HTTP_PORT = 3000;
    private HTTPS_PORT = 3001;
    private httpsServer: https.Server;
    private proxy: any;
    private httpsApp: Express;
    private httpApp: Express;
    private recorder = new HttpRecorder();

    constructor() {
        this.setupProxy();
        this.setupHttpServer();
        this.setupHttpsServer();
    }

    public setupProxy() {

        this.proxy = httpProxy.createProxyServer({
            secure: false,
        });
        this.proxy.on("error", this.onProxyError.bind(this));
        this.proxy.on("proxyReq", this.onProxyRequest.bind(this));
        this.proxy.on("proxyRes", this.onProxyResponse.bind(this));

    }

    /**
     * Start listening and serve requests
     */
    public listen() {
        this.httpApp.listen(this.HTTP_PORT, () => {
            printInfo(`Listening HTTP on port ${this.HTTP_PORT}`);
        });
        this.httpsServer.listen(this.HTTPS_PORT, () => {
            printInfo(`Listening HTTPS on port ${this.HTTPS_PORT}`);
        });
    }

    private setupHttpServer() {
        this.httpApp = express();
        this.httpApp.all("*", this.proxyRequestHandler.bind(this));
    }

    private setupHttpsServer() {
        this.httpsApp = express();

        this.httpsApp.all("*", this.proxyRequestHandler.bind(this));

        const options = {
            key: fs.readFileSync("./ssl/snakeoil.key"),
            cert: fs.readFileSync("./ssl/snakeoil.crt"),
        };

        this.httpsServer = https.createServer(options, this.httpsApp);
    }

    private proxyRequestHandler(req: express.Request, res: express.Response) {
        printInfo("proxyRequestHandler: " + req.originalUrl);

        const target = req.protocol + "://" + req.get("host");
        printInfo("Handling request: " + target);

        this.proxy.web(req, res, {target});
    }

    private onProxyError(e: Error) {
        printInfo("===== Proxy error: " + e.message, e);
    }


    private onProxyRequest(proxyReq: IncomingMessage, req: IncomingMessage, res: ServerResponse) {
        printInfo("onProxyRequest: " + req.url);
        this.recorder.registerRequest(req);
    }

    private onProxyResponse(proxyRes: IncomingMessage, req: express.Request, res: express.Response) {
        printInfo("onProxyResponse: " + req.url);
        this.recorder.registerResponse(res);
    }

    public persistRequests(path: string) {
        this.recorder.persistRequests(path);
    }
}
