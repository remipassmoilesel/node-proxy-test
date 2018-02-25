import * as chai from 'chai';
import {HttpSequenceStub} from "../test-generator/HttpSequenceStub";
import {runRequest} from "../test-generator/testUtils";

const assert = chai.assert;

const httpSequence = new HttpSequenceStub();

describe(' > Some interesting module', () => {

    it(' > GET /url?query', () => {
        runRequest(httpSequence.get_nominatim_openstreetmap_org_search_query_params());
    });

    it(' > POST /url?query', () => {
        runRequest(httpSequence.post_nominatim_openstreetmap_org_search_query_params(''));
    });

});