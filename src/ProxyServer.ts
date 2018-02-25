#!/usr/bin/env node

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import * as express from "express";
import {Express} from "express";
import * as fs from 'fs';
import * as https from "https";

const httpProxy = require('http-proxy');

function printInfo(msg: any, data?: any) {
    console.log(`[${new Date()}] ${msg}`);
    if (data) {
        console.log(data);
    }
}

export class ProxyServer {

    private HTTP_PORT = 3000;
    private HTTPS_PORT = 3001;
    private httpsServer: https.Server;
    private proxy: any;
    private httpsApp: Express;
    private httpApp: Express;

    constructor() {
        this.setupProxy();
        this.setupHttpServer();
        this.setupHttpsServer();
    }

    public setupProxy() {

        this.proxy = httpProxy.createProxyServer({secure: false});
        this.proxy.on('error', this.onProxyError.bind(this));
        this.proxy.on('proxyReq', this.onProxyRequest.bind(this));
        this.proxy.on('proxyRes', this.onProxyResponse.bind(this));

    }

    private setupHttpsServer() {
        this.httpsApp = express();
        this.httpsApp.all('*', (req: express.Request, res: express.Response) => {
            this.logReq(req);
            const target = req.protocol + '://' + req.get('host');
            this.proxy.web(req, res, {target});
        });

        const options = {
            key: fs.readFileSync('ssl/snakeoil.key'),
            cert: fs.readFileSync('ssl/snakeoil.crt')
        };

        this.httpsServer = https.createServer(options, this.httpsApp);
    }

    private setupHttpServer() {
        this.httpApp = express();
        this.httpApp.all('*', (req: express.Request, res: express.Response) => {
            this.logReq(req);
            const target = req.protocol + '://' + req.get('host');
            this.proxy.web(req, res, {target});
        });
    }

    /**
     * Start listening and serve requests
     */
    public listen() {
        this.httpsServer.listen(this.HTTPS_PORT, () => {
            printInfo(`Listening HTTPS on port ${this.HTTPS_PORT}`);
        });
        this.httpApp.listen(this.HTTP_PORT, () => {
            printInfo(`Listening HTTP on port ${this.HTTP_PORT}`);
        });
    }

    public onProxyError(e: Error) {
        console.error('===== Proxy error: ' + e.message, e);
    }

    public onProxyRequest(proxyReq: any, req: any, res: any, options: any) {
        this.logReq(req);
        // console.log(proxyReq);
    }

    public onProxyResponse(proxyRes: any, req: any, res: any, options: any) {
        this.logReq(req);
        // console.log(proxyRes);
    }

    public logReq(req: express.Request) {
        printInfo(`Request: ${req.originalUrl}`);
    }

    public getServer() {
        return this.httpsServer;
    }

}
