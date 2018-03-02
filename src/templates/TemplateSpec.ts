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

        /*<#variablesInit>*/
        /*<&initLine>*/
        /*</variablesInit>*/

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
