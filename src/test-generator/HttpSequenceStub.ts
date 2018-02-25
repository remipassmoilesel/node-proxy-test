import {HttpMethod, HttpRequest} from "./HttpRequest";

import * as chai from 'chai';

const assert = chai.assert;

export class HttpSequenceStub {

    public post_nominatim_openstreetmap_org_search_query_params(bearer: string, arg2?: any, arg3?: any): HttpRequest {
        return {
            protocol: 'https://',
            path: '/search/',
            query: '?<params>',
            host: 'nominatim.openstreetmap.org',
            headers: {
                bearer: bearer,
            },
            method: HttpMethod.POST,
            expectedResponse: {
                code: 200,
            },
            assert: (request: HttpRequest) => {
                assert.isEmpty(request.headers);
            }
        };
    }

    public get_nominatim_openstreetmap_org_search_query_params(arg1?: any, arg2?: any, arg3?: any): HttpRequest {
        return {
            protocol: 'https://',
            path: '/search/',
            query: '?<params>',
            host: 'nominatim.openstreetmap.org',
            headers: [],
            method: HttpMethod.GET,
            expectedResponse: {
                code: 302,
            },
        };
    }

}
