export function printInfo(msg: any, data?: any) {
    console.log(`[${new Date()}] ${msg}`);
    if (data) {
        console.log(data);
    }
}
