#!/bin/bash

if [ -n "$ORG_SECRETS" ]; then
  echo "Parsing ORG_SECRETS and exporting variables..."
  eval "$(
    echo "$ORG_SECRETS" \
      | jq -r 'to_entries | map("export " + .key + "=" + (.value|@sh)) | .[]'
  )"
fi

if [ -n "$RDS_SECRETS" ]; then
  echo "Parsing RDS_SECRETS and exporting variables..."
  eval "$(
    echo "$RDS_SECRETS" \
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