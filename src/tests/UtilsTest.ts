import * as chai from 'chai';
import * as fmocha from 'f-mocha';
import {Utils} from '../common/Utils';
import {HttpRequest} from '../proxy-server/HttpRequest';

const sourceMapSupport = require('source-map-support');
sourceMapSupport.install();

fmocha.setup();

const assert = chai.assert;

const sampleRequest: HttpRequest = {
    requestId: 'fakeRequestId',
    url: 'http://keycloak.somewhere.net/auth/admin/master/console/',
    method: 'GET',
    statusCode: 200,
    request: {
        headers: {
            'host': 'keycloak.somewhere.net',
            'proxy-connection': 'keep-alive',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (119 Chrome/64.0.3282.119 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'referer': 'http://keycloak.somewhere.net/auth/admin/master/console-4dc3-83ce-7fe6d5ed0cce%2Frole-mappings',
            'accept-encoding': 'gzip, deflate',
            'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
        },
        body: '',
    },
    response: {
        headers: {
            'date': 'Tue, 27 Feb 2018 22:56:55 GMT',
            'content-type': 'text/html;charset=utf-8',
            'transfer-encoding': 'chunked',
            'connection': 'close',
            'cache-control': 'no-cache',
            'x-xss-protection': '1; mode=block',
            'x-frame-options': 'SAMEORIGIN',
            'content-security-policy': 'frame-src \'self\'; frame-ancestors \'self\'; object-src \'none\';',
            'x-robots-tag': 'none',
            'strict-transport-security': 'max-age=31536000; includeSubDomains',
            'x-content-type-options': 'nosniff',
            'content-language': 'en',
            'bad-header': 'some forbidden ${chars} ${in} template strings',
            'content-encoding': 'gzip',
        },
        body: '\u001f�\b\u0000\u0000\u0000\u0000\u0000\u0000\u0003�YO��&\u0014��S\u0010]�',
    },
};

describe(' > Utils', function() {
    this.timeout(10000);

    it(' > Should ignore body of request if data is binary', () => {
        assert.isTrue(Utils.isInvalidBody(sampleRequest.response.body));
        assert.isFalse(Utils.isInvalidBody(sampleRequest.response.headers.date));
    });

    it(' > Should replace template string variable sequence', () => {
        const transformed: HttpRequest = Utils.escapeForTemplateStrings(sampleRequest);
        const match = transformed.response.headers['bad-header'].match(/([^\\]\$\{)/);
        assert.isNull(match);
    });

});

