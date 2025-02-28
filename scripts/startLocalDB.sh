#!/bin/bash

set -a  # Automatically export all variables
source .env
set +a  # Stop automatically exporting variables

echo "DB_USER: $DB_USER"
echo "DB_PASSWORD: $DB_PASSWORD"
echo "DB_NAME: $DB_NAME"
echo "DB_PORT: $DB_PORT"

docker run --name local-core-db \
  -e POSTGRES_USER=$DB_USER \
  -e POSTGRES_PASSWORD=$DB_PASSWORD \
  -e POSTGRES_DB=$DB_NAME \
  -p $DB_PORT:$DB_PORT \
  -d postgres:latest
