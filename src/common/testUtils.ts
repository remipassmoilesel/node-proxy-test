import * as chai from "chai";
import { wait } from "f-promise";
import * as got from "got";
import { HttpRequest } from "../proxy-server/HttpRequest";
import { printInfo } from "./common";

const assert = chai.assert;

export function runRequest(request: HttpRequest) {

    printInfo(`Running request: ${request.url}`);

    let response;
    try {
        response = wait(got(request.url, {
            headers: request.headers,
        }));
    } catch (e) {
        response = e;
    }

    if (request.expectedResponse && request.expectedResponse.code) {
        assert.equal(request.expectedResponse.code, response.statusCode);
    }

    return response;
}

