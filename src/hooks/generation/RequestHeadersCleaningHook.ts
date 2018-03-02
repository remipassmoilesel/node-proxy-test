import * as _ from 'lodash';
import { HttpRequest } from '../../proxy-server/HttpRequest';
import { AbstractTestGenerationHook } from '../lib/AbstractTestGenerationHook';
import { IMethodArgument } from '../lib/IMethodArgument';

/**
 * Http got client can do weird things if content-type is in request
 */
export class RequestHeadersCleaningHook extends AbstractTestGenerationHook {

    private headersToRemove: string[] = [
        'content-type',
        'proxy-connection',
        'content-length',
    ];

    public beforeTestGeneration(request: HttpRequest): IMethodArgument[] | void {

        _.forEach(this.headersToRemove, (header) => {
            if (request.request.headers[header]) {
                delete request.request.headers[header];
            }
        });

    }

}

