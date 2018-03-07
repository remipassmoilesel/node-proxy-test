import * as _ from 'lodash';
import { HttpMethod, HttpRequest } from '../../proxy-server/HttpRequest';
import { AbstractHttpRecordingHook } from '../models/AbstractHttpRecordingHook';

export class HttpMethodFilterHook extends AbstractHttpRecordingHook {

    private filteredMethods: HttpMethod[] = [
        'OPTION',
        'HEAD',
        'TRACE',
        'CONNECT',
    ];

    public filterRequestOnReception(request: HttpRequest): boolean {
        return _.includes(this.filteredMethods, request.method);
    }

}

