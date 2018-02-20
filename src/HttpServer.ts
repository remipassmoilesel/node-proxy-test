#!/usr/bin/env node

import * as express from 'express';
import {Express} from 'express';
import * as http from 'http';

const proxy: any = require('express-http-proxy');

function printInfo(msg: any, data?: any) {
    console.log(`[${new Date()}] ${msg}`);
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
        this.app.use('/', proxy(
            (incomingMessage: any) => {
                printInfo('');
                printInfo('');
                printInfo('');
                printInfo(incomingMessage);
                printInfo('', incomingMessage.headers);
                printInfo('', incomingMessage.method);
                printInfo('', incomingMessage.originalUrl);

                return incomingMessage.originalUrl;
            }, {
                proxyReqPathResolver: (req: express.Request) => {
                    printInfo('Resolving: ' + req.baseUrl + ' ' + req.method);
                    return req.protocol + '://' + req.get('host') + req.originalUrl;
                },
                // filter: (req: express.Request, res: express.Response) => {
                //     printInfo('Filtering: ' + req.baseUrl + ' ' + req.method);
                //     return true;
                // }
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
