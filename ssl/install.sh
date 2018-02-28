#!/bin/bash

# mercredi 28 février 2018, 22:48:33 (UTC+0100)

sudo cp ./localhost/cert.pem /usr/local/share/ca-certificates/localhost.crt

sudo update-ca-certificates
