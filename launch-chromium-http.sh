#!/bin/bash

# mardi 20 février 2018, 23:54:33 (UTC+0100)

# See: https://www.chromium.org/developers/design-documents/network-settings

chromium-browser --proxy-server="https://127.0.0.1:3001;http://127.0.0.1:3000" --enable-logging=stderr

# Other chromium arguments:
#   --verbose


