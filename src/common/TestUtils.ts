import { wait } from 'f-promise';
import * as got from 'got';
import { HttpRequest } from '../proxy-server/HttpRequest';
import { printInfo, printWarning } from './print';

export class TestUtils {

    public static runRequest(request: HttpRequest): any {

        printInfo(`Running request: ${request.url}`);

        let response;
        try {
            response = wait(got(request.url, {
                headers: request.request.headers,
            }));
        } catch (e) {
            response = e;
        }

        return response;
    }


    public debugResponse(response: any) {
        printWarning('=== Response debug: ');

        if (response instanceof Error) {
            printWarning('** Response is an error:');

            const anyResponse: any = response as any;

            if (anyResponse.statusCode) {
                printWarning('  Informations: ' + anyResponse.statusCode);
                printWarning('   - statusCode: ' + anyResponse.statusCode);
                printWarning('   - statusMessage: ' + anyResponse.statusMessage);
                printWarning('   - host: ' + anyResponse.host);
                printWarning('   - hostname: ' + anyResponse.hostname);
                printWarning('   - method: ' + anyResponse.method);
                printWarning('   - path: ' + anyResponse.path);
                printWarning('   - protocol: ' + anyResponse.protocol);
                printWarning('   - url: ' + anyResponse.url);
            }

            printWarning(`  Error stack: \n${response.stack}`);

            if (anyResponse.response && anyResponse.response.body) {
                const body = (response as any).response.body;
                printWarning(`** Response contains a body: ${JSON.stringify(body, null, 2)}`);

            } else {
                printWarning('** Response does NOT contain a body');
            }

        } else {
            printWarning('** Response is NOT an error');
            printWarning(`** Response: ${JSON.stringify(response, null, 2)}`);
        }

    }

}

