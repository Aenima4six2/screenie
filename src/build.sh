#!/bin/bash

# Build UI
(cd ./app && yarn && yarn run build:server)

# Build Server
(cd ./server && yarn)
