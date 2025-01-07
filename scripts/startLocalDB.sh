#!/bin/bash

set -a  # Automatically export all variables
source .env
set +a  # Stop automatically exporting variables

echo "LOCAL_DB_USER: $LOCAL_DB_USER"
echo "LOCAL_DB_PASSWORD: $LOCAL_DB_PASSWORD"
echo "LOCAL_DB_NAME: $LOCAL_DB_NAME"
echo "LOCAL_DB_PORT: $LOCAL_DB_PORT"

docker run --name postgres-local \
  -e POSTGRES_USER=$LOCAL_DB_USER \
  -e POSTGRES_PASSWORD=$LOCAL_DB_PASSWORD \
  -e POSTGRES_DB=$LOCAL_DB_NAME \
  -p $LOCAL_DB_PORT:$LOCAL_DB_PORT \
  -d postgres:latest
