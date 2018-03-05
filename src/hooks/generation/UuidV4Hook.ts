import _ = require('lodash');
import { HttpRequest } from '../../proxy-server/HttpRequest';
import { AbstractTestGenerationHook } from '../models/AbstractTestGenerationHook';
import { IMethodArgument } from '../models/IMethodArgument';

export interface IUuidV4HookOptions {
    replaceInResponse: boolean;
}

export class UuidV4Hook extends AbstractTestGenerationHook {

    private uuidV4Regex = /([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})/gi;
    private options: IUuidV4HookOptions;

    constructor(options: IUuidV4HookOptions){
        super();
        this.options = options;
    }

    public beforeTestGeneration(request: HttpRequest): IMethodArgument[] | void {

        const methodArgs: IMethodArgument[] = [];

        request.url = this.replaceUuid(request.url, methodArgs);
        request.request.body = this.replaceUuid(request.request.body, methodArgs);

        if (this.options.replaceInResponse){
            request.response.body = this.replaceUuid(request.response.body, methodArgs);
        }

        if (request.request.headers.referer){
            request.request.headers.referer = this.replaceUuid(request.request.headers.referer, methodArgs);
        }

        return _.uniqBy(methodArgs, (arg) => arg.name);
    }

    private replaceUuid(target: string, methodArgs: IMethodArgument[]) {
        const matches = target.match(this.uuidV4Regex);
        if (matches && matches.length) {

            _.forEach(matches, (rawUuid: string) => {
                const uuidFormatted = this.removeCarets(rawUuid);

                target = target.replace(new RegExp(rawUuid, 'ig'), '${' + uuidFormatted + '}');

                methodArgs.push({
                    name: uuidFormatted,
                    type: 'string',
                    defaultValue: '\'' + rawUuid + '\'',
                });
            });
        }

        return target;
    }

    private removeCarets(rawUuid: string): string {
        return 'u_' + rawUuid.replace(/-/ig, '_');
    }
}
