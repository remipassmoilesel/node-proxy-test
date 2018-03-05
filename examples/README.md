# node-proxy-tests examples

These examples show how we can record an http api.

**2018-03-05T19:48:07.157Z.json** is a raw record of HTTP exchanges between a browser and a docker instance of
a [Keycloak Server](http://www.keycloak.org)

**SuspiciousFermiSpec.ts** is a ready-to-use generated [Typescript](http://www.typescriptlang.org)  source code 
file. It can be executed on NodeJS. It uses [Mocha](https://mochajs.org) and [Chai](http://chaijs.com/), 
two great tests tools !

**SuspiciousFermiRequests.ts** Contains transformed HTTP requests.


## Reproduce them in 5 minutes

... on Keycloak server:

    $ cd examples
    $ ./run-keycloak-container.sh
    
    $ npm run cli record
    $ ./launch-chrome.sh
    
    CTRL + C

    $ npm run cli generate 0
    

