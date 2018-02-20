#!/usr/bin/env node

import * as express from 'express';
import {Express} from 'express';
import * as http from 'http';

function printInfo(msg: string, data?: any) {
    console.log(msg);
    if (data) {
        console.log(data);
    }
}

export class HttpServer {

    private SERVER_PORT = 3000;
    private expressApp: Express;
    private server: http.Server;

    constructor() {
        this.expressApp = express();
    }

    /**
     * Start listening and serve requests
     */
    public listen() {

        this.server = this.expressApp.listen(this.SERVER_PORT, () => {
            printInfo(`Application available on port ${this.SERVER_PORT}`);
        });

    }

    public getServer() {
        return this.server;
    }

    public getExpressApp() {
        return this.expressApp;
    }

    private logReq(req: express.Request) {
        printInfo(`Received request: ${req.originalUrl}`);
    }

}
