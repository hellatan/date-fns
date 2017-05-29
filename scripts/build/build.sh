#!/bin/bash

# The script unifies the build scripts.
#
# It's the entry point for the build process.

set -e

./docs.js
./fp.js
./typings.js
./indices.js
