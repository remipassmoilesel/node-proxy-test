#!/usr/bin/env node

import {HttpServer} from "./HttpServer";

const http = new HttpServer();
http.listen();