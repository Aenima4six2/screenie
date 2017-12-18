#!/bin/bash
set -e

# Build
./build.sh

# Run Server
(cd ./server && yarn run start:dev)
