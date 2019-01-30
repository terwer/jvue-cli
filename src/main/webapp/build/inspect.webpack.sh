#!/usr/bin/env bash

pwd
cd ./src/ssr
rm ./webpack.config.generated.js
mkdir tmp
pwd
echo 'module.exports = ' >> ./tmp/tmp1
vue inspect > ./tmp/tmp2
cat ./tmp/tmp1 ./tmp/tmp2 > ./webpack.config.generated.js
rm -rf ./tmp
exit 0