#!/bin/bash

# Build
./build.sh

# Run Server
(cd ./server && yarn run start:dev)
