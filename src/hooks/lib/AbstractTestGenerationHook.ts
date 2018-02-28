import { HttpRequest } from "../../proxy-server/HttpRequest";
import { IMethodArgument } from "./IMethodArgument";

export abstract class AbstractTestGenerationHook {
    public beforeTestGeneration(request: HttpRequest): IMethodArgument[] | void {
        return;
    }
}
