#!/bin/bash

# The script unifies the test scripts.
#
# It's used as the main Travis CI script.

set -e

if [ "$TEST_SUITE" == "main" ]
then
  yarn lint
  yarn flow-check
  ./scripts/test/systemJS.js
  ./scripts/test/smoke.sh
  yarn test-ci
  yarn test-tz

elif [ "$TEST_SUITE" == "tz" ]
then
  yarn test-tz-extended

elif [ "$TEST_SUITE" == "cross_browser" ] && [ "$SAUCE_USERNAME" != "" ]
then
  yarn test-cross-browser

else
  printf "\n\033[0;31m" "UNKNOWN SUITE!" "\033[0m\n"
  exit 1
fi

./scripts/test/countTests.sh
