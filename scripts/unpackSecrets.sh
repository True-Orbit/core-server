#!/bin/bash

if [ -n "$RDS_DEVELOPMENT_SECRETS" ]; then
  echo "Parsing WEB_SERVICE_SECRETS and exporting variables..."
  eval "$(
    echo "$RDS_DEVELOPMENT_SECRETS" \
      | jq -r 'to_entries | map("export " + .key + "=" + (.value|@sh)) | .[]'
  )"
fi

if [ -n "$CORE_SERVER_SECRETS" ]; then
  echo "Parsing CORE_SERVER_SECRETS and exporting variables..."
  eval "$(
    echo "$CORE_SERVER_SECRETS" \
      | jq -r 'to_entries | map("export " + .key + "=" + (.value|@sh)) | .[]'
  )"
fi

echo "$port"