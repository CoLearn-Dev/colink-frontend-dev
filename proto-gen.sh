#!/bin/bash

# dependencies
# yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=proto/ proto/*.proto

# proto setup for client application
protoc -I=. ./colink-server-dev/proto/*.proto \
  --js_out=import_style=commonjs:./colink-frontend-dev \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:./colink-frontend-dev

# fix folder formatting (TODO: implement neater solution)
mv ./colink-frontend-dev/colink-server-dev/proto ./colink-frontend-dev/proto
rm -rf ./colink-frontend-dev/colink-server-dev
