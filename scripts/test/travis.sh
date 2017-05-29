#!/bin/bash

# The script unifies the test scripts.
#
# It's used as the main Travis CI script.

if [ "$TEST_SUITE" == "main" ]
then
  yarn lint || exit 1
  yarn flow-check || exit 1
  yarn systemjs-check || exit 1
  yarn test-smoke || exit 1
  yarn test-ci || exit 1
  yarn test-tz || exit 1

elif [ "$TEST_SUITE" == "tz" ]
then
  yarn test-tz-extended || exit 1

elif [ "$TEST_SUITE" == "cross_browser" ] && [ "$SAUCE_USERNAME" != "" ]
then
  yarn test-cross-browser || exit 1

else
  printf "\n\033[0;31m" "UNKNOWN SUITE!" "\033[0m\n"
fi

yarn count-tests
