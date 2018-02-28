import { wait } from 'f-promise';
import * as got from 'got';
import { HttpRequest } from '../proxy-server/HttpRequest';
import { printInfo } from './print';

export function runRequest(request: HttpRequest) {

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

