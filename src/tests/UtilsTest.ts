import * as chai from "chai";
import * as fmocha from "f-mocha";
import {Utils} from "../common/Utils";

fmocha.setup();

const assert = chai.assert;

describe(" > Utils", function () {
    this.timeout(10000);

    it(" > Should ignore body of request if data is binary", () => {

        const request = {
            "url": "http://keycloak.somewhere.net/auth/admin/master/console/",
            "host": "keycloak.somewhere.net",
            "protocol": "http:",
            "method": "GET",
            "statusCode": 200,
            "request": {
                "headers": {
                    "host": "keycloak.somewhere.net",
                    "proxy-connection": "keep-alive",
                    "cache-control": "max-age=0",
                    "upgrade-insecure-requests": "1",
                    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/64.0.3282.119 Chrome/64.0.3282.119 Safari/537.36",
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                    "referer": "http://keycloak.somewhere.net/auth/admin/master/console/?redirect_fragment=%2Frealms%2Fhey%2Fusers%2F014e7c41-6f50-4dc3-83ce-7fe6d5ed0cce%2Frole-mappings",
                    "accept-encoding": "gzip, deflate",
                    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7"
                },
                "body": ""
            },
            "response": {
                "headers": {
                    "date": "Tue, 27 Feb 2018 22:56:55 GMT",
                    "content-type": "text/html;charset=utf-8",
                    "transfer-encoding": "chunked",
                    "connection": "close",
                    "cache-control": "no-cache",
                    "x-xss-protection": "1; mode=block",
                    "x-frame-options": "SAMEORIGIN",
                    "content-security-policy": "frame-src 'self'; frame-ancestors 'self'; object-src 'none';",
                    "x-robots-tag": "none",
                    "strict-transport-security": "max-age=31536000; includeSubDomains",
                    "x-content-type-options": "nosniff",
                    "content-language": "en",
                    "content-encoding": "gzip"
                },
                "body": "\u001f�\b\u0000\u0000\u0000\u0000\u0000\u0000\u0003�YO��&\u0014��S\u0010]�"
            }
        };

        assert.isTrue(Utils.isBinaryBody(request.response, request.response.body));
    });

});

