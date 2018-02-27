import {printInfo} from "../common/common";

const socks = require("socksv5");


export class SocksProxyServer {

    private SOCKS_PORT = 3000;
    private socksServer: any;

    constructor() {

        this.socksServer = socks.createServer((info: any, accept: any, deny: any) => {
            printInfo("Request received ", info);
            accept();
        });

        this.socksServer.useAuth(socks.auth.None());
    }

    public listen() {
        this.socksServer.listen(3000, "localhost", () => {
            printInfo("SOCKS server listening on port " + this.SOCKS_PORT);
        });
    }

}
