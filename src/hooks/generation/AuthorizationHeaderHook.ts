import * as _ from 'lodash';
import { HttpRequest } from '../../proxy-server/HttpRequest';
import { AbstractTestGenerationHook } from '../lib/AbstractTestGenerationHook';
import { IMethodArgument } from '../lib/IMethodArgument';

export class AuthorizationHeaderHook extends  AbstractTestGenerationHook {

    public beforeTestGeneration(request: HttpRequest): IMethodArgument[] | void {

        const authorization: string = _.find(request.request.headers,
            (val, name) => name.indexOf('authorization') !== -1);
        if (authorization) {
            request.request.headers.authorization = '${authorization}';
            return [
                {
                    name: 'authorization',
                    type: 'string',
                    defaultValue: '"Add authorization here !"',
                },
            ];
        }

    }

}
