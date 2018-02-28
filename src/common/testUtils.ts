import * as chai from 'chai';
import { wait } from 'f-promise';
import * as got from 'got';
import { HttpRequest } from '../proxy-server/HttpRequest';
import { printInfo } from './common';

const assert = chai.assert;

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

    assert.equal(request.statusCode, response.statusCode);

    return response;
}

