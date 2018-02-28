import * as _ from "lodash";
import { HttpRequest } from "../proxy-server/HttpRequest";
import { AbstractTestGenerationHook } from "./lib/AbstractTestGenerationHook";
import { IMethodArgument } from "./lib/IMethodArgument";

export class BearerHook extends  AbstractTestGenerationHook {

    public beforeTestGeneration(request: HttpRequest): IMethodArgument[] | void {
        const bearer: string = _.find(request.request.headers, (val, name) => name.indexOf("authorization") !== -1);
        if (bearer && bearer.indexOf("Bearer") !== 1) {
            request.request.headers.authorization = "Bearer ${bearer}";
            return [
                {
                    name: "bearer",
                    type: "string",
                    defaultValue: '"Add bearer here !"',
                },
            ];
        }
    }

}
