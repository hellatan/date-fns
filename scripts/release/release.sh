#!/bin/bash

set -e

PACKAGE_PATH="$(pwd)/../../tmp/package"
./writeVersion.js

env PACKAGE_OUTPUT_PATH="$PACKAGE_PATH" ../build/package.sh

echo "//registry.npmjs.org/:_authToken=$NPM_KEY" > ~/.npmrc
cd "$PACKAGE_PATH"
npm publish
TODO
cd -

./updateFirebase.js
./tweet.js
