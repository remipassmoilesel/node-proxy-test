#!/usr/bin/env node

import {ProxyServer} from "./ProxyServer";

const http = new ProxyServer();
http.listen();