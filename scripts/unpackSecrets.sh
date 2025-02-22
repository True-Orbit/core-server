#!/bin/bash
# entrypoint.sh

if [ -n "$RDS_DEVELOPMENT_SECRETS" ]; then
  echo "Parsing WEB_SERVICE_SECRETS and exporting variables..."
  eval "$(
    echo "$RDS_DEVELOPMENT_SECRETS" \
      | jq -r 'to_entries | map("export " + .key + "=" + (.value|@sh)) | .[]'
  )"
fi

if [ -n "$CORE_SERVER_SECRETS" ]; then
  echo "Parsing WEB_SERVICE_SECRETS and exporting variables..."
  eval "$(
    echo "$CORE_SERVER_SECRETS" \
      | jq -r 'to_entries | map("export " + .key + "=" + (.value|@sh)) | .[]'
  )"
fi

export DB_PORT=$port
export DB_HOST=$host
export DB_USER=$username
export DB_PASSWORD=$password
export DB_NAME=$dbname

echo "DB_PORT: $DB_PORT"