import { HttpRequest } from '../../proxy-server/HttpRequest';

export abstract class AbstractHttpRecordingHook {

    public filterRequestOnSending(request: HttpRequest): boolean {
        return true;
    }

    public filterRequestOnReception(request: HttpRequest): boolean {
        return true;
    }

}
