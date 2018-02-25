#!/usr/bin/env node

import {HttpProxyServer} from "./HttpProxyServer";

const http = new HttpProxyServer();
http.listen();