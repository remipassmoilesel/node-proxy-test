#!/usr/bin/env node

import * as express from 'express';
import {Express} from 'express';
import * as http from 'http';

const proxy: any = require('express-http-proxy');

function printInfo(msg: string, data?: any) {
    console.log(msg);
    if (data) {
        console.log(data);
    }
}

export class HttpServer {

    private SERVER_PORT = 3000;
    private app: Express;
    private server: http.Server;

    constructor() {
        this.app = express();
        this.setupProxyFilter();
    }

    public setupProxyFilter() {
        this.app.use('/proxy', proxy('www.google.com', {
            filter: function (req: express.Request, res: express.Response) {
                printInfo(req.baseUrl + ' ' + req.method);
                return req.method == 'GET';
            }
        }));
    }

    /**
     * Start listening and serve requests
     */
    public listen() {

        this.server = this.app.listen(this.SERVER_PORT, () => {
            printInfo(`Application available on port ${this.SERVER_PORT}`);
        });

    }

    public getServer() {
        return this.server;
    }

    public getExpressApp() {
        return this.app;
    }

    private logReq(req: express.Request) {
        printInfo(`Received request: ${req.originalUrl}`);
    }

}
