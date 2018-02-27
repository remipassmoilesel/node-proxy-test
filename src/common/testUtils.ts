import { wait } from "f-promise";
import * as got from "got";
import { HttpRequest } from "../proxy-server/HttpRequest";

export function runRequest(request: HttpRequest) {
    const res = wait(got(request.url, {
        headers: request.headers,
    }));
    return res;
}

