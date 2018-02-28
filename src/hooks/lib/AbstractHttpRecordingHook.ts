import { HttpRequest } from "../../proxy-server/HttpRequest";

export abstract class AbstractHttpRecordingHook {
    public filterRequest(request: HttpRequest): boolean {
        return true;
    }
}
