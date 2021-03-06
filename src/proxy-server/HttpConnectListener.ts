import * as http from 'http';
import * as net from 'net';
import {printDebug, printError, printWarning} from '../common/print';

const debugging = false;

const regexHostPort = /^([^:]+)(:([0-9]+))?$/;

// see https://newspaint.wordpress.com/2012/11/05/node-js-http-and-https-proxy/

export class HttpConnectListener {

    public registerListener(server: http.Server) {

        // add handler for HTTPS (which issues a CONNECT to the proxy)
        server.addListener('connect', (request, socketRequest, bodyhead) => {

                const url = request.url;
                const httpVersion = request.httpVersion;
                const hostport = this.getHostPortFromString(url, '443');

                printWarning(`HTTPS upgrade (HTTPS requests cannot be recorded): ${url}`);

                if (debugging) {
                    printDebug('  = will connect to %s:%s', hostport[0], hostport[1]);
                }

                // set up TCP connection
                const proxySocket = new net.Socket();
                proxySocket.connect(Number(hostport[1]), hostport[0], () => {
                        if (debugging) {
                            printDebug('  < connected to %s/%s', hostport[0], hostport[1]);
                        }

                        if (debugging) {
                            printDebug('  > writing head of length %d', bodyhead.length);
                        }

                        proxySocket.write(bodyhead);

                        // tell the caller the connection was successfully established
                        socketRequest.write('HTTP/' + httpVersion + ' 200 Connection established\r\n\r\n');
                    },
                );

                proxySocket.on('data', (chunk: any) => {
                        if (debugging) {
                            printDebug('  < data length = %d', chunk.length);
                        }

                        socketRequest.write(chunk);
                    },
                );

                proxySocket.on('end', () => {
                        if (debugging) {
                            printDebug('  < end');
                        }

                        socketRequest.end();
                    },
                );

                socketRequest.on('data', (chunk: any) => {
                        if (debugging) {
                            printDebug('  > data length = %d', chunk.length);
                        }

                        proxySocket.write(chunk);
                    },
                );

                socketRequest.on('end', () => {
                        if (debugging) {
                            printDebug('  > end');
                        }

                        proxySocket.end();
                    },
                );

                proxySocket.on('error', (err) => {
                        printError('[CONNECT] Error: ', err);

                        socketRequest.write('HTTP/' + httpVersion + ' 500 Connection error\r\n\r\n');
                        if (debugging) {
                            printDebug('  < ERR: %s', err);
                        }
                        socketRequest.end();
                    },
                );

                socketRequest.on('error', (err: any) => {
                        printError('[CONNECT] Error: ', err);

                        if (debugging) {
                            printDebug('  > ERR: %s', err);
                        }
                        proxySocket.end();
                    },
                );
            },
        ); // HTTPS connect listener
    }

    private getHostPortFromString(hostString: string, defaultPort: string) {
        let host = hostString;
        let port = defaultPort;

        const result = regexHostPort.exec(hostString);
        if (result != null) {
            host = result[1];
            if (result[2] != null) {
                port = result[3];
            }
        }

        return ([host, port]);
    }
}
