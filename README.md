# node-proxy-test

**Utility for generating TypeScript / Mocha tests from HTTP request, in order to tests APIs.**

[![Build Status](https://travis-ci.org/remipassmoilesel/IaC-high-availability-load-balancing.svg?branch=master)](https://travis-ci.org/remipassmoilesel/IaC-high-availability-load-balancing)

[![Coverage Status](https://coveralls.io/repos/remipassmoilesel/IaC-high-availability-load-balancing/badge.svg?branch=master)](https://coveralls.io/r/remipassmoilesel/IaC-high-availability-load-balancing?branch=master)

## Usage

Installation:
    
    $ git clone ...
    $ cd node-proxy-test
    $ npm i
    
Open a proxy on port 3000 and record HTTP traffic:     
    
    $ npm run cli record  

Open a web browser using this proxy:

    $ ./launch-chromium.sh
    
Play with your api then press CTRL-C once to stop recording and write a JSON file in `recorder` directory.     

Generate Mocha Typescript tests:

    $ npm run cli generate
    
Play them:

    $ npm run generated-tests
    
