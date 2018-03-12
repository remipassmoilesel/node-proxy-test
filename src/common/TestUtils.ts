import * as chai from 'chai';
import { wait } from 'f-promise';
import * as got from 'got';
import * as uuid from 'uuid';
import { HttpRequest } from '../proxy-server/HttpRequest';
import { printInfo, printWarning } from './print';

const assert = chai.assert;

export class TestUtils {

    public static runRequest(request: HttpRequest): any {

        printInfo(`Running request: ${request.url}`);

        let response;
        try {
            response = wait(got(request.url, {
                headers: request.request.headers,
            }));
        } catch (e) {
            printWarning(`Error was thrown: ${e.statusCode} - ${request.method} - ${request.url}`);
            response = e;
        }

        return response;
    }

    public assertNotError(toInspect: any) {
        try {
            assert.notInstanceOf(toInspect, Error);
        } catch (e) {
            e.stack += '\n\nInspected objet: ' + this.getDebugInformationsForResponse(toInspect);
            throw e;
        }
    }

    public assertError(toInspect: any, expectedStatusCode?: number) {
        try {
            assert.instanceOf(toInspect, Error);
            if (expectedStatusCode) {
                assert.equal(toInspect.statusCode, expectedStatusCode);
            }
        } catch (e) {
            e.stack += '\n\nInspected objet: ' + this.getDebugInformationsForResponse(toInspect);
            throw e;
        }
    }

    public uniqueName(prefix: string): string {
        return prefix + '_' + uuid.v4();
    }


    public printDebugForResponse(response: any) {
        printWarning(this.getDebugInformationsForResponse(response));
    }

    public getDebugInformationsForResponse(toInspect: any) {
        let result = '=== DEBUG INFORMATIONS ===';

        if (toInspect instanceof Error) {
            result += '\n** Object is an error:';

            const toInspectAny: any = toInspect as any;

            if (toInspectAny.statusCode) {
                result += '\n  Object have a status code, informations: ';
                result += '\n   - statusCode: ' + toInspectAny.statusCode;
                result += '\n   - statusMessage: ' + toInspectAny.statusMessage;
                result += '\n   - host: ' + toInspectAny.host;
                result += '\n   - hostname: ' + toInspectAny.hostname;
                result += '\n   - method: ' + toInspectAny.method;
                result += '\n   - path: ' + toInspectAny.path;
                result += '\n   - protocol: ' + toInspectAny.protocol;
                result += '\n   - url: ' + toInspectAny.url;
            }

            result += `\n  Error stack: \n${toInspect.stack}`;

            if (toInspectAny.response && toInspectAny.response.body) {
                const body = (toInspect as any).response.body;
                result += `\n** Object contains a body: ${JSON.stringify(body, null, 2)}`;
            } else {
                result += '\n** Object does NOT contain a body';
            }

        } else {
            result += '\n** Object is NOT an error';
            result += `\n** Object: ${JSON.stringify(toInspect, null, 2)}`;
        }

        return result;
    }

}

