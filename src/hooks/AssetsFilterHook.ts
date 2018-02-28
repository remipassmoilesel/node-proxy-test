import * as _ from 'lodash';
import { HttpRequest } from '../proxy-server/HttpRequest';
import { AbstractHttpRecordingHook } from './lib/AbstractHttpRecordingHook';

export class AssetsFilterHook extends AbstractHttpRecordingHook {

    private assetRegexArray = [
        /\.jpe?g$/,
        /\.ico$/,
        /\.svg$/,
        /\.tiff$/,
        /\.bmp$/,
        /\.gif$/,
        /\.jpe?g$/,
        /\.png$/,
        /\.css$/,
        /\.ttf$/,
        /\.woff$/,
        /\.woff2$/,
        /\.eot$/,
        /\.html?$/,
        /\.js$/,
    ];

    public filterRequestOnSending(request: HttpRequest): boolean {
        let recordRequest = true;
        _.forEach(this.assetRegexArray, (regex) => {
            if (request.url.match(regex)) {
                recordRequest = false;
            }
        });
        return recordRequest;
    }

}
