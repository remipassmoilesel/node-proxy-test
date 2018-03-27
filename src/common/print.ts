// tslint:disable:no-console
import * as assert from 'assert';
import * as moment from 'moment';
const colors = require('colors/safe');

function getDate(){
    return moment().format('hh:mm:ss');
}

function printColor(color: string, symbol: string, msg: any, ...data: any[]) {
    assert.ok(color, 'Color is undefined');
    assert.ok(symbol, 'Symbol is undefined');

    if (!msg){
        console.log();
        return;
    }

    const message = colors[color](`${getDate()} - [${symbol}]  ${msg}`);
    console.log(message);
    if (data && data.length > 0) {
        console.log(data);
    }
}

export function printDebug(msg: any, ...data: any[]) {
    printColor.apply(null, ['white', '.', msg].concat(data));
}

export function printInfo(msg: any, ...data: any[]) {
    printColor.apply(null, ['cyan', '~', msg].concat(data));
}

export function printWarning(msg: any, ...data: any[]) {
    printColor.apply(null, ['yellow', '!', msg].concat(data));
}

export function printError(msg: any, ...data: any[]) {
    printColor.apply(null, ['red', 'X', msg].concat(data));
}
