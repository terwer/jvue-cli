#!/usr/bin/env bash

# clean
rm -rf ssrdist

# makedir
mkdir ssrdist
cd ssrdist
mkdir client
mkdir server

# build client
yarn build-entry-client
# build server
yarn build-entry-server

echo "build done,copying files..."
pwd
cp -r ../ssrcdist/* ./client
cp -r ../ssrsdist/js/* ./server
rm -rf ../ssrcdist
rm -rf ../ssrsdist
echo "copye finish.🌟 "