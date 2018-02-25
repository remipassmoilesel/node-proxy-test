import * as _ from "lodash";
import {HttpRequest} from "../proxy-server/HttpRequest";

export interface ITestGeneratorHook {
    beforeRender(request: HttpRequest): IMethodArgument[] | void;
}

export interface IMethodArgument {
    path: string;
    name: string;
    defaultValue: any;
}

export class BearerHook implements ITestGeneratorHook {

    public beforeRender(request: HttpRequest): IMethodArgument[] | void {
        const bearer = _.find(request.headers, h => h.indexOf('Bearer') !== -1);
        if (bearer) {
            return [
                {
                    path: 'request.headers.Bearer',
                    name: 'bearer',
                    defaultValue: 'Add bearer here !'
                }
            ]
        }
    }

}