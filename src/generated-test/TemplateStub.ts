import {HttpRequest} from "../proxy-server/HttpRequest";

import * as chai from 'chai';

const assert = chai.assert;

export class TemplateStub {

    public /*::methodName::*/post_nominatim_openstreetmap_org_search_query_params/*::methodName::*/
    (/*::methodParams::*/bearer: string, arg2?: any, arg3?: any/*::methodParams::*/)
    /*::methodReturnType::*/: HttpRequest /*::methodReturnType::*/ {

        return /*::methodReturnValue::*/{
            url: 'eee',
            protocol: 'https://',
            host: 'nominatim.openstreetmap.org',
            headers: {
                bearer: bearer,
            },
            method: 'POST',
            expectedResponse: {
                code: 200,
            },
            assert: (request: HttpRequest) => {
                assert.isEmpty(request.headers);
            }
        }/*::methodReturnValue::*/;
    }

}
