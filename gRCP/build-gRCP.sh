#!/bin/bash

# This script builds the gRPC server application.
protoc --go_out=. --go-grpc_out=. proto/app_service.proto

cp -r app_service server


cd server || exit
./deploy.sh
cd - || exit


echo "gRPC server built successfully."
