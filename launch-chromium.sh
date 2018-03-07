#!/bin/bash

# mardi 20 février 2018, 23:54:33 (UTC+0100)

# See: https://www.chromium.org/developers/design-documents/network-settings

echo Starting browser using proxy on port 63000

chromium-browser --proxy-server="http://127.0.0.1:63000" --enable-logging=stderr

# FIXME
# chromium-browser --proxy-server="https://127.0.0.1:63001;http://127.0.0.1:63000" --enable-logging=stderr

# Other chromium arguments:
#   --verbose


