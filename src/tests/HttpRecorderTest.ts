import * as chai from 'chai';
import * as fmocha from 'f-mocha';
import { IncomingMessage } from 'http';
import { IAugmentedServerResponse } from '../proxy-server/HttpProxyServer';
import { HttpRecorder } from '../proxy-server/HttpRecorder';

const sourceMapSupport = require('source-map-support');
sourceMapSupport.install();

fmocha.setup();

const assert = chai.assert;

describe(' > HttpRecorder', function() {
    this.timeout(10000);

    it(' > Should register request', () => {
        const recorder = new HttpRecorder([]);
        const fakeReq: IncomingMessage = {
            url: 'http://fake-url.org',
            method: 'GET',
            statusCode: 0,
            headers: {
                fakeHeader1: 'fakeHeader1',
                fakeHeader2: 'fakeHeader2',
            },
            on: () => {
                return;
            },
        } as any;
        recorder.registerRequest({} as any, fakeReq);

        const recorded = recorder.getRequests();
        assert.lengthOf(recorded, 1);
        assert.equal(recorded[0].url, 'http://fake-url.org');
        assert.equal(recorded[0].method, 'GET');
        assert.deepEqual(recorded[0].request.headers, {
            fakeHeader1: 'fakeHeader1',
            fakeHeader2: 'fakeHeader2',
        });

    });

    it(' > Should register response, and attach it to the last corresponding request', () => {
        const recorder = new HttpRecorder([]);
        const fakeReq: IncomingMessage = {
            url: 'http://fake-url.org',
            method: 'GET',
            statusCode: 0,
            headers: {
                fakeHeader1: 'fakeHeader1',
                fakeHeader2: 'fakeHeader2',
            },
            on: () => {
                return;
            },
        } as any;
        recorder.registerRequest({} as any, fakeReq);
        recorder.registerRequest({} as any, fakeReq);

        const recorded = recorder.getRequests();
        assert.lengthOf(recorded, 2);

        const fakeProxyRes: IncomingMessage = {
            on: () => {
                return;
            },
            headers: {
                fakeHeader1: 'fakeHeader1',
                fakeHeader2: 'fakeHeader2',
            },
        } as any;

        const fakeRes: IAugmentedServerResponse = {
            url: 'http://fake-url.org',
            req: fakeReq,
            statusCode: 200,
            on: () => {
                return;
            },
        } as any;

        recorder.registerResponse(fakeProxyRes, fakeRes);

        assert.equal(recorded[1].url, 'http://fake-url.org');
        assert.deepEqual(recorded[0].response.headers, {});
        assert.deepEqual(recorded[1].response.headers, fakeReq.headers);

    });

});

