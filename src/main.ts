#!/usr/bin/env node

import * as _ from "lodash";
import {printInfo} from "./common";
import {HttpProxyServer} from "./proxy-server/HttpProxyServer";
import {MochaGenerator} from "./test-generator/MochaGenerator";

const cleanArgs = _.map(process.argv.slice(2), (arg: string) => arg.trim());

function printHelp(){
    console.log('record:    Open a proxy and record http requests, then generate tests');
    console.log('play:      Play tests');
}

if (_.includes(cleanArgs, "record")) {

    const http = new HttpProxyServer();
    http.listen();

    // const socks = new SocksProxyServer();
    // socks.listen();

    const requests = http.getRequests();

    const generator = new MochaGenerator();
    generator.generate(requests);
}

else if (_.includes(cleanArgs, "play")) {
    throw new Error("Not implemented");
}

else {
    printInfo("Bad command");
    printHelp();
    process.exit(1);
}
