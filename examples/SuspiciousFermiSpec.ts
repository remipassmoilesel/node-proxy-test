// tslint:disable
import * as chai from "chai";
import * as fmocha from "f-mocha";
import {SuspiciousFermiRequests} from "./SuspiciousFermiRequests";
import {TestUtils} from '../common/TestUtils';

fmocha.setup();

const assert = chai.assert;

const requests = new SuspiciousFermiRequests();

describe(" > Some interesting module", function () {
    this.timeout(10000);

    it(" > All requests", () => {

        // These variables are extracted with pre-generation hooks
        // - One hook variabilize host in order to change it
        // - One hook authorization headers
        // - One hook variabilize UUIDS

        const http127001 = "http://127.0.0.1";
        const authorization = "Add authorization here !";
        const u_5b4f0445_a04f_40c2_9f5a_0e956c3ab495 = '5b4f0445-a04f-40c2-9f5a-0e956c3ab495';
        const u_5522532e_69ab_4868_a014_c4095d69f72d = '5522532e-69ab-4868-a014-c4095d69f72d';

        TestUtils.runRequest(requests.request_postHttp1270018080AuthRealmsMasterLoginActionsAuthenticateCodeVgdum0jxshverlzpqulSy2xfldd7kvxcklw9o8ajjkExecution5b4f0445A04f40c29f5a0e956c3ab495ClientIdSecurityAdminConsoleTabIdRiy9k2tyjv8_0(http127001, u_5b4f0445_a04f_40c2_9f5a_0e956c3ab495));
        TestUtils.runRequest(requests.request_getHttp1270018080AuthAdminMasterConsoleConfig_0(http127001));
        TestUtils.runRequest(requests.request_postHttp1270018080AuthRealmsMasterProtocolOpenidConnectToken_0(http127001));
        TestUtils.runRequest(requests.request_getHttp1270018080AuthAdminMasterConsoleWhoami_0(http127001, authorization));
        TestUtils.runRequest(requests.request_getHttp1270018080AuthRealmsMasterProtocolOpenidConnectLoginStatusIframeHtmlInitClientIdSecurityAdminConsoleOriginHttp3a2f2f1270013a8080_0(http127001));
        TestUtils.runRequest(requests.request_getHttp1270018080AuthResources343FinalAdminKeycloakLibComponentsFontAwesomeFontsFontawesomeWebfontWoff2V430_0(http127001));
        TestUtils.runRequest(requests.request_getHttp1270018080AuthAdminRealmsMasterAuthenticationRequiredActions_0(http127001, authorization));
        TestUtils.runRequest(requests.request_postHttp1270018080AuthAdminRealmsMasterUsers_0(http127001, authorization));
        TestUtils.runRequest(requests.request_getHttp1270018080AuthAdminRealmsMasterUsers5522532e69ab4868A014C4095d69f72d_0(http127001, authorization, u_5522532e_69ab_4868_a014_c4095d69f72d));
        TestUtils.runRequest(requests.request_getHttp1270018080AuthAdminRealmsMaster_0(http127001, authorization));
        TestUtils.runRequest(requests.request_getHttp1270018080AuthAdminRealms_0(http127001, authorization));
        TestUtils.runRequest(requests.request_getHttp1270018080AuthAdminRealmsMasterAuthenticationRequiredActions_1(http127001, authorization));
        TestUtils.runRequest(requests.request_getHttp1270018080AuthAdminRealmsMasterAttackDetectionBruteForceUsers5522532e69ab4868A014C4095d69f72d_0(http127001, authorization, u_5522532e_69ab_4868_a014_c4095d69f72d));
        TestUtils.runRequest(requests.request_getHttp1270018080AuthAdminRealmsMaster_1(http127001, authorization));
        TestUtils.runRequest(requests.request_getHttp1270018080AuthAdminRealms_1(http127001, authorization));
        TestUtils.runRequest(requests.request_getHttp1270018080AuthAdminRealmsMasterUsersFirst0Max20_0(http127001, authorization));

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
