// tslint:disable:no-console
import * as assert from "assert";
const colors = require('colors/safe');

export function printColor(color: string, msg: any, ...data: any[]) {
    assert.ok(color, 'Color is undefined');
    const message = `[${new Date()}] ${colors[color](msg)}`;
    console.log(message);
    if (data && data.length > 0) {
        console.log(data);
    }
}

export function printInfo(msg: any, ...data: any[]) {
    printColor.apply(null, ['cyan', msg].concat(data));
}

export function printWarning(msg: any, ...data: any[]) {
    printColor.apply(null, ['yellow', msg].concat(data));
}

export function printError(msg: any, ...data: any[]) {
    printColor.apply(null, ['red', msg].concat(data));
}
