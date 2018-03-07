#!/bin/bash

# mardi 20 février 2018, 23:54:33 (UTC+0100)

# See: https://www.chromium.org/developers/design-documents/network-settings

echo Starting browser using proxy on port 63000

#google-chrome --allow-insecure-localhost --proxy-server="https://localhost:63001;http://localhost:63000" --enable-logging=stderr
google-chrome --proxy-server="http://127.0.0.1:63000" --enable-logging=stderr



