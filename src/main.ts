#!/usr/bin/env node

import {HttpProxyServer} from "./HttpProxyServer";
import {SocksProxyServer} from "./SocksProxyServer";

const http = new HttpProxyServer();
// http.listen();

const socks = new SocksProxyServer();
socks.listen();
