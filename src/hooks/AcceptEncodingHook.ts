import * as _ from "lodash";
import { HttpRequest } from "../proxy-server/HttpRequest";
import { IMethodArgument, ITestGeneratorHook } from "./hookTypes";

export class AcceptEncodingHook implements ITestGeneratorHook {

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
