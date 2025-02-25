#!/bin/bash
# Change the names from RDS_DEVELOPMENT_SECRETS to something core server specific

export DB_PORT=$port
export DB_HOST=$host
export DB_USER=$username
export DB_PASSWORD=$password
export DB_NAME=$dbname

echo "DB_PORT: $DB_PORT"