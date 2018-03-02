import {HttpRequest} from '../../proxy-server/HttpRequest';
import {AbstractTestGenerationHook} from '../lib/AbstractTestGenerationHook';
import {IMethodArgument} from '../lib/IMethodArgument';

export class HostHook extends AbstractTestGenerationHook {
    private newDomain: string;

    constructor(pattern: string | RegExp, newDomain: string) {
        super();
        this.newDomain = newDomain;
    }

    public beforeTestGeneration(request: HttpRequest): IMethodArgument[] | void {

        const matches = request.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        if (matches) {
            const domain = matches && matches[1];

            request.url = request.url.replace(domain, this.newDomain);

            HostHook.replaceHeader(request, 'host', domain, this.newDomain);
            HostHook.replaceHeader(request, 'access-control-allow-origin', domain, this.newDomain);

        }

    }

    public static replaceHeader(request: HttpRequest, header: string, oldValue: string, newValue: string) {
        if (request.request.headers[header]) {
            request.request.headers[header] = request.request.headers[header].replace(oldValue, newValue);
        }
    }

}
