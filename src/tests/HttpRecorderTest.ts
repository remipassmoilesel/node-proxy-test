import * as chai from 'chai';
import * as fmocha from 'f-mocha';
import { IncomingMessage } from 'http';
import { Utils } from '../common/Utils';
import { HttpRecorder } from '../proxy-server/HttpRecorder';
import { HttpRequest } from '../proxy-server/HttpRequest';

const sourceMapSupport = require('source-map-support');
sourceMapSupport.install();

fmocha.setup();

const assert = chai.assert;

describe.only(' > HttpRecorder', function() {
    this.timeout(10000);

    it(' > Should register request', () => {
        const recorder = new HttpRecorder([]);
        const fakeReq: IncomingMessage = {
            url: 'http://fake-url.org',
            method: 'GET',
            statusCode: 200,
            headers: {
                fakeHeader1: 'fakeHeader1',
                fakeHeader2: 'fakeHeader2',
            },
            on: () => {return; },
        } as any;
        recorder.registerRequest({} as any, fakeReq);

        const recorded = recorder.getRequests();
        assert.lengthOf(recorded, 1);
        assert.equal(recorded[0].url, 'http://fake-url.org');
        assert.equal(recorded[0].method, 'GET');
        assert.deepEqual(recorded[0].request.headers,  {
            fakeHeader1: 'fakeHeader1',
            fakeHeader2: 'fakeHeader2',
        });

    });

});

