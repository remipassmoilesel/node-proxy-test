import * as _ from 'lodash';
import { HttpRequest } from '../../proxy-server/HttpRequest';
import { AbstractTestGenerationHook } from '../models/AbstractTestGenerationHook';
import { IMethodArgument } from '../models/IMethodArgument';

/**
 * Http got client can do weird things if content-type is in request
 */
export class HeadersCleaningHook extends AbstractTestGenerationHook {

    private requestHeadersToRemove: string[] = [
        'host',
        'accept',
        'content-type',
        'proxy-connection',
        'content-length',
        'user-agent',
        'referer',
        'accept-encoding',
        'accept-language',
        'if-none-match',
        'cache-control',
        'upgrade-insecure-requests',
        'origin',
    ];

    private responseHeadersToRemove: string[] = [
        'host',
        'content-type',
        'proxy-connection',
        'content-length',
        'server',
        'date',
        'connection',
        'access-control-allow-origin',
        'access-control-allow-methods',
        'access-control-allow-headers',
        'access-control-expose-headers',
        'access-control-allow-credentials',
        'etag',
        'upgrade-insecure-requests',
        'cache-control',
    ];

    public beforeTestGeneration(request: HttpRequest): IMethodArgument[] | void {

        // request
        _.forEach(this.requestHeadersToRemove, (header) => {
            if (request.request.headers[header]) {
                delete request.request.headers[header];
            }
        });

        // response
        _.forEach(this.responseHeadersToRemove, (header) => {
            if (request.response.headers[header]) {
                delete request.response.headers[header];
            }
        });

    }

}

