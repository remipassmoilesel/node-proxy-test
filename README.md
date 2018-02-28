# node-proxy-test

**Utility for generating TypeScript / Mocha tests from HTTP requests, in order to tests APIs.**

## Usage

Installation:
    
    $ git clone ...
    $ cd node-proxy-test
    $ npm i
    
Open a proxy on port 3000 and record HTTP traffic:     
    
    $ npm run cli record  

Open a web browser using this proxy (selected browser should not be opened yet):

    $ ./launch-chromium.sh
    
Play with your API, watch logs on terminal, then press CTRL-C once to stop recording and write a JSON file in `recorder` directory.     

Generate Mocha Typescript tests:

    $ npm run cli generate
    $ npm run cli generate 4
    $ npm run cli generate /path/to/file.json
    
Play them:

    $ npm run generated-tests
    
