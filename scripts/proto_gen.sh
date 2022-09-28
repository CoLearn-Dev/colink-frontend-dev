#!/bin/bash

# remove old proto directory
rm -rf ./proto_js/*

# proto setup for client application
protoc -I=. ./proto/*.proto \
  --js_out=import_style=commonjs:./proto_js \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:./proto_js

# fix folder formatting (TODO: implement neater solution)
mv ./proto_js/proto/* ./proto_js
rm -rf ./proto_js/proto

# have service client point to correct definitions file (TODO: implement neater solution)
sed -i '' -e 's#../proto/colink_pb#./colink_pb#' ./proto_js/ColinkServiceClientPb.ts