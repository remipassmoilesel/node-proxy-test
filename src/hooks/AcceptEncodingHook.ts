import * as _ from "lodash";
import { HttpRequest } from "../proxy-server/HttpRequest";
import { AbstractTestGenerationHook } from "./lib/AbstractTestGenerationHook";
import { IMethodArgument } from "./lib/IMethodArgument";

export class AcceptEncodingHook implements AbstractTestGenerationHook {

    public beforeTestGeneration(request: HttpRequest): IMethodArgument[] | void {
        const acceptEncoding = _.find(request.request.headers, (val, name) => name.indexOf("accept-encoding") !== -1);
        if (acceptEncoding) {
            request.request.headers["accept-encoding"] = "${acceptEncoding}";
            return [
                {
                    name: "acceptEncoding",
                    type: "string",
                    defaultValue: '"Add encoding here !"',
                },
            ];
        }
    }

}
