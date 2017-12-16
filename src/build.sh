#!/bin/bash

# Build UI
(cd ./app && yarn && yarn run build)

# Build Server
(cd ./server && yarn)
