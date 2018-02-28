// tslint:disable:no-console

const colors = require('colors/safe');

export function printColor(color: string, msg: any, data?: any) {
    const message = `[${new Date()}] ${colors[color](msg)}`;
    console.log(message);
    if (data) {
        console.log(data);
    }
}

export function printInfo(msg: any, data?: any) {
    printColor('cyan', msg, data);
}

export function printWarning(msg: any, data?: any) {
    printColor('yellow', msg, data);
}

export function printError(msg: any, data?: any) {
    printColor('red', msg, data);
}
