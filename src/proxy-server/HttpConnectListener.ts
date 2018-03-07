import * as http from "http";
import * as net from "net";
import {printWarning} from "../common/print";

const debugging = false;

const regex_hostport = /^([^:]+)(:([0-9]+))?$/;

// see https://newspaint.wordpress.com/2012/11/05/node-js-http-and-https-proxy/

export class HttpConnectListener {

    public registerListener(server: http.Server) {

        console.log('public registerListener(server: http.Server){')

        // add handler for HTTPS (which issues a CONNECT to the proxy)
        server.addListener('connect', (request, socketRequest, bodyhead) => {

                printWarning('HTTPS upgrade: HTTPS requests cannot be recorded !');

                const url = request['url'];
                const httpVersion = request['httpVersion'];

                const hostport = this.getHostPortFromString(url, '443');

                if (debugging)
                    console.log('  = will connect to %s:%s', hostport[0], hostport[1]);

                // set up TCP connection
                const proxySocket = new net.Socket();
                proxySocket.connect(
                    parseInt(hostport[1]), hostport[0],
                    function () {
                        if (debugging)
                            console.log('  < connected to %s/%s', hostport[0], hostport[1]);

                        if (debugging)
                            console.log('  > writing head of length %d', bodyhead.length);

                        proxySocket.write(bodyhead);

                        // tell the caller the connection was successfully established
                        socketRequest.write("HTTP/" + httpVersion + " 200 Connection established\r\n\r\n");
                    }
                );

                proxySocket.on(
                    'data',
                    function (chunk: any) {
                        if (debugging)
                            console.log('  < data length = %d', chunk.length);

                        socketRequest.write(chunk);
                    }
                );

                proxySocket.on(
                    'end',
                    function () {
                        if (debugging)
                            console.log('  < end');

                        socketRequest.end();
                    }
                );

                socketRequest.on(
                    'data',
                    function (chunk: any) {
                        if (debugging)
                            console.log('  > data length = %d', chunk.length);

                        proxySocket.write(chunk);
                    }
                );

                socketRequest.on(
                    'end',
                    function () {
                        if (debugging)
                            console.log('  > end');

                        proxySocket.end();
                    }
                );

                proxySocket.on(
                    'error',
                    function (err) {
                        socketRequest.write("HTTP/" + httpVersion + " 500 Connection error\r\n\r\n");
                        if (debugging) {
                            console.log('  < ERR: %s', err);
                        }
                        socketRequest.end();
                    }
                );

                socketRequest.on(
                    'error',
                    function (err: any) {
                        if (debugging) {
                            console.log('  > ERR: %s', err);
                        }
                        proxySocket.end();
                    }
                );
            }
        ); // HTTPS connect listener
    }

    private getHostPortFromString(hostString: string, defaultPort: string) {
        let host = hostString;
        let port = defaultPort;

        const result = regex_hostport.exec(hostString);
        if (result != null) {
            host = result[1];
            if (result[2] != null) {
                port = result[3];
            }
        }

        return ([host, port]);
    }
}