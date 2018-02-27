// tslint:disable
import * as chai from "chai";
import * as fmocha from "f-mocha";
/*<#requestsImports>*/
/*<&importLine>*/
/*</requestsImports>*/

fmocha.setup();

const assert = chai.assert;

/*<&requestsInstantiation>*/

describe(" > Some interesting module", function() {
    this.timeout(10000);

    it(" > All requests", () => {
        // Example:
        // runRequest(httpSequence.post_nominatim_openstreetmap_org_search_query_params('Add bearer here !'));

        /*<#requestsMethodCalls>*/
        /*<&methodCall>*/
        /*</requestsMethodCalls>*/

    });

    it(" > Empty stub ", () => {
        assert.isTrue(true);
    });

    it(" > Empty stub ", () => {
        assert.isTrue(true);
    });

    it(" > Empty stub ", () => {
        assert.isTrue(true);
    });

    it(" > Empty stub ", () => {
        assert.isTrue(true);
    });

});
