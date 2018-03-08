import _ = require('lodash');
import { HttpRequest } from '../../proxy-server/HttpRequest';
import { AbstractTestGenerationHook } from '../models/AbstractTestGenerationHook';
import { IMethodArgument } from '../models/IMethodArgument';

const camel = require('to-camel-case');

export interface IHostHookOptions {
    replaceInResponse?: boolean;
    hostPattern?: RegExp;
}

/**
 * Hosts are replaced if they contains http prefix in order to not replace too much things
 *
 */
export class HostHook extends AbstractTestGenerationHook {

    private defaultDomainRegex: RegExp = /(https?:)?\/\/[a-z0-9][a-z0-9\.-]{1,61}[a-z0-9]+(:[0-9]+)?/ig;
    private options: IHostHookOptions = { replaceInResponse: true, hostPattern: this.defaultDomainRegex };
    private hostPattern: RegExp;
    private replaceInResponse: boolean;

    constructor(options?: IHostHookOptions) {
        super();
        _.merge(this.options, options);
        this.hostPattern = this.options.hostPattern as any;
        this.replaceInResponse = this.options.replaceInResponse as any;
    }

    public beforeTestGeneration(request: HttpRequest): IMethodArgument[] | void {

        // console.log(request)

        const methodArgs: IMethodArgument[] = [];

        request.url = this.replace(request.url, methodArgs);
        request.request.body = this.replace(request.request.body, methodArgs);

        if (this.replaceInResponse){
            request.response.body = this.replace(request.response.body, methodArgs);
        }

        this.replaceHeader(request, 'host', methodArgs);
        this.replaceHeader(request, 'access-control-allow-origin', methodArgs);

        return _.uniqBy(methodArgs, (arg) => arg.name);
    }

    private replaceHeader(request: HttpRequest, header: string, methodArgs: IMethodArgument[]) {
        if (request.request.headers[header]) {
            request.request.headers[header] = this.replace(request.request.headers[header], methodArgs);
        }
    }

    private replace(subject: string, methodArguments: IMethodArgument[]): string {
        const matches = subject.match(this.hostPattern);

        if (matches) {
            let modifiedSubject: string = subject;
            _.forEach(matches, (domain) => {
                const varName = this.getVariableNameFromDomain(domain);
                modifiedSubject = modifiedSubject.replace(domain, '${' + varName + '}');

                methodArguments.push({
                    name: varName,
                    type: 'string',
                    defaultValue: `"${domain}"`,
                });
            });
            return modifiedSubject;
        }
        return subject;
    }

    private getVariableNameFromDomain(domain: string): string {
        return camel(domain);
    }
}
