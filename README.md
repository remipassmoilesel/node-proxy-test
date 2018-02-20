# Infrastructure Manager: High availability load balancing, Infrastructure as Code

    /!\ This is a work in progress experiment, not usable as is for production use

[![Build Status](https://travis-ci.org/remipassmoilesel/IaC-high-availability-load-balancing.svg?branch=master)](https://travis-ci.org/remipassmoilesel/IaC-high-availability-load-balancing)

[![Coverage Status](https://coveralls.io/repos/remipassmoilesel/IaC-high-availability-load-balancing/badge.svg?branch=master)](https://coveralls.io/r/remipassmoilesel/IaC-high-availability-load-balancing?branch=master)

**Purpose**: Small experiment of an infrastructure as code setup. Write how do you want your servers,
then click on Start button and see them get up !

## Installation schema

![Installation schema](documentation/images/schema.png)

## How does it works ?

**Two load balancers share a virtual IP address**. Only one load balancer serve requests. If one of the load balancers 
is unhealthy or down, the other one serve requests.

**Two servers serve applications**. Requests are load balanced between these servers by Nginx. If one of the servers 
is unhealthy or down, an other one serve requests.

**Infrastructure as code**: All infrastrucutre is described in `description` folder. Example of application server:

```

    ---
    name: applications
    
    specifications:
      cpu: 2
      memory: 2048
    
    network:
      addressMin: 192.168.0.20
      addressMax: 192.168.0.22
    
    scaling:
      minInstances: 1
      maxInstances: 2
    
    ansibleConfiguration:
      creation:
        - applications.yml
    
      beforeScaleDown:
        - loadbalancers.yml
    
      afterScaleUp:
        - loadbalancers.yml

    ...
    

```

## Use it

This project works only on GNU/Linux. It may work on others systems but it will require more work.

1. Edit files in `description/` directory. 
1. Install prerequisistes and launch server:
```
    $ cd infrastructure-manager
    $ ./launch-servers.js
```

## Software components

- Recommended OS: Ubuntu 16.04LTS
- Keepalived: routing software for virtual IP adresses
- Nginx: for load balance requests to applications
- Docker
- NodeJS
- Terraform
- Ansible

## TODO

- Add TLS support to load balancers

