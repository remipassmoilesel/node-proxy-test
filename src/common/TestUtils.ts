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

    public static debugResponse(response: any) {

        printWarning('=== Response debug: ');

        if (response instanceof Error) {
            printWarning('** Response is an error:');

            if ((response as any).statusCode) {
                const anyResponse: any = response;
                printWarning('** Informations: ' + anyResponse.statusCode);
                printWarning('   - statusCode: ' + anyResponse.statusCode);
                printWarning('   - statusMessage: ' + anyResponse.statusMessage);
                printWarning('   - host: ' + anyResponse.host);
                printWarning('   - hostname: ' + anyResponse.hostname);
                printWarning('   - method: ' + anyResponse.method);
                printWarning('   - path: ' + anyResponse.path);
                printWarning('   - protocol: ' + anyResponse.protocol);
                printWarning('   - url: ' + anyResponse.url);
            }

            printWarning('  Error stack:', response.stack);

        } else {
            printWarning('** Response is NOT an error');
        }

    }

}

