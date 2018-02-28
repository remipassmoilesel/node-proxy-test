import * as _ from "lodash";
import { printInfo } from "../common/common";
import { HttpRequest } from "../proxy-server/HttpRequest";
import { AbstractHttpRecordingHook } from "./lib/AbstractHttpRecordingHook";

export class ContentTypeFilterHook extends AbstractHttpRecordingHook {

    private mimeTypesArray = [
        /text\/html/,
        /text\/css/,
        /audio\//,
        /video\//,
        /image\//,
    ];

    public filterRequestOnReception(request: HttpRequest): boolean {

        const contentType: string | undefined = request.response.headers["content-type"];
        if (!contentType) {
            printInfo(`Warning, response do not have a content-type header: ${request.url}`);
            return true;
        }

        let recordRequest = true;
        _.forEach(this.mimeTypesArray, (regex) => {
            if (contentType.match(regex)) {
                recordRequest = false;
            }
        });
        return recordRequest;
    }

}

