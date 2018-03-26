#!/bin/bash

# mardi 20 février 2018, 23:54:33 (UTC+0100)

# See: https://www.chromium.org/developers/design-documents/network-settings

echo
echo Starting browser using proxy on port 63000
echo

chromium-browser --proxy-server="http://127.0.0.1:63000" --enable-logging=stderr
