#!/usr/bin/env python3

import subprocess

# See: https://www.chromium.org/developers/design-documents/network-settings

CHROMIUM_BIN_NAMES = [
    'chromium',
    'chromium-browser'
]

def getChromiumName():
    for name in CHROMIUM_BIN_NAMES:
        result = subprocess.run(name + ' --help', shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode == 0:
            return name

    raise Exception('Chromium was not found on this system !')

def startChromium():
    command = getChromiumName() + ' --proxy-server="http://127.0.0.1:63000" --enable-logging=stderr'
    subprocess.run(command, shell=True)

if __name__ == "__main__":
    startChromium()