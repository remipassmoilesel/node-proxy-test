# node-proxy-test

**Utility for generating TypeScript / Mocha application tests from HTTP requests, in order to tests APIs.**

This project have been tested only on Gnu/Linux Ubuntu.

![Image of Yaktocat](doc/icon.png)

## Description

With this tool, you can record HTTP activity of your web browser in a json file, then export it 
as a [Typescript](http://www.typescriptlang.org) source code ready-to-use with [Mocha](https://mochajs.org) 
and [Chai](http://chaijs.com/), two greats tools for tests !

## Examples of data and generated tests 

See [examples](examples/) directory !

## Usage

Installation:
    
    $ git clone ...
    $ cd node-proxy-test
    $ npm run install-cli
    
Open a proxy on port 3000 and record HTTP traffic:     
    
    $ node-proxy-test record  

Open a web browser using this proxy (selected browser should not be opened yet):

    $ node-proxy-test launch-chromium    
    
Play with your API, watch logs on terminal, then press CTRL-C once to stop recording and write a JSON 
file in `recorder` directory.     

Generate Mocha Typescript tests:

    $ node-proxy-test generate
    $ node-proxy-test generate 4
    $ node-proxy-test generate /path/to/file.json
    
Play them:

    $ node-proxy-test run
    
Clean them:

    $ node-proxy-test clean-generated    
    
## About hooks

Http requests can be modified by programmatic hooks, before persit them on disk and before 
test generation. See [src/hooks/models](src/hooks/models) for more informations.
