#!/bin/bash

# remove old proto directory
rm -rf ./colink-frontend-dev/proto

# proto setup for client application
protoc -I=. ./colink-server-dev/proto/*.proto \
  --js_out=import_style=commonjs:./colink-frontend-dev \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:./colink-frontend-dev

# fix folder formatting (TODO: implement neater solution)
mv ./colink-frontend-dev/colink-server-dev/proto ./colink-frontend-dev/proto
rm -rf ./colink-frontend-dev/colink-server-dev

# have service client point to correct definitions file (TODO: implement neater solution)
sed -i '' -e 's#../../colink-server-dev/proto/colink_pb#./colink_pb#' ./colink-frontend-dev/proto/ColinkServiceClientPb.ts