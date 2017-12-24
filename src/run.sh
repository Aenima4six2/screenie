#!/bin/bash
set -e

# Build
./build.sh

# Run Server
docker-compose up -d screenie-mongo
(cd ./server && yarn run start:dev)
