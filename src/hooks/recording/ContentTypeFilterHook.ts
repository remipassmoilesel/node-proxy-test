import * as _ from 'lodash';
import { printWarning } from '../../common/print';
import { Utils } from '../../common/Utils';
import { HttpRequest } from '../../proxy-server/HttpRequest';
import { AbstractHttpRecordingHook } from '../lib/AbstractHttpRecordingHook';

export class ContentTypeFilterHook extends AbstractHttpRecordingHook {

    private mimeTypesArray = [
        /text\/html/,
        /text\/css/,
        /audio\//,
        /video\//,
        /image\//,
    ];

    public filterRequestOnReception(request: HttpRequest): boolean {

        const contentType: string | undefined = request.response.headers['content-type'];
        if (!contentType) {
            printWarning(`Warning, response do not have a content-type header: ${Utils.limitStringSize(request.url, 120)}`);
            return true;
        }

        let recordRequest = true;
        _.forEach(this.mimeTypesArray, (regex) => {
            const match = contentType.match(regex);
            if (match) {
                // printInfo(match)
                recordRequest = false;
            }
        });
        return recordRequest;

    }

}

