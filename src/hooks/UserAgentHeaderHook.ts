import * as _ from "lodash";
import { HttpRequest } from "../proxy-server/HttpRequest";
import { AbstractTestGenerationHook } from "./lib/AbstractTestGenerationHook";
import { IMethodArgument } from "./lib/IMethodArgument";

export class UserAgentHeaderHook extends  AbstractTestGenerationHook {

    public beforeTestGeneration(request: HttpRequest): IMethodArgument[] | void {
        const userAgent = _.find(request.request.headers, (val, name) => name.indexOf("user-agent") !== -1);
        if (userAgent) {
            request.request.headers["user-agent"] = "${userAgent}";
            return [
                {
                    name: "userAgent",
                    type: "string",
                    defaultValue: '"Add user agent here !"',
                },
            ];
        }
    }

}
