#!/bin/bash
set -e

# Build UI
(cd ./app && yarn && yarn run build:server)

# Build Server
(cd ./server && yarn)
