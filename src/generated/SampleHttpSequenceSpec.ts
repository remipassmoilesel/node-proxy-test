import * as chai from 'chai';
import {SampleHttpSequenceStub} from "./SampleHttpSequenceStub";
import {runRequest} from "../test-generator/testUtils";

const assert = chai.assert;

const httpSequence = new SampleHttpSequenceStub();

describe(' > Some interesting module', () => {

    it(' > GET /url?query', () => {
        runRequest(httpSequence.get_nominatim_openstreetmap_org_search_query_params());
    });

    it(' > POST /url?query', () => {
        runRequest(httpSequence.post_nominatim_openstreetmap_org_search_query_params(''));
    });

});