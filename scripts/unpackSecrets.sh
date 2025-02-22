#!/bin/bash
# unpackSecrets.sh
#
# Set environment variables from JSON secrets stored in AWS Secrets Manager
#
# Each secret map should have the following format:
# [
#   {
#     "awsSecretName": "someSecretEnvVar",
#     "fields": {
#       "awsName": "envName",
#       "awsName2": "envName2"
#     }
#   },
#   ...
# ]
#
# For each secret map, the script will:
#   1. Look up the environment variable named by "awsSecretName"
#   2. Parse that JSON to extract each key listed in "fields".
#   3. Export an environment variable named by the value of "fields" (or the key if the value is null)
#      with the corresponding secret value.
#
# Usage:
#   ./unpackSecrets.sh [path/to/secretsMap.json]
#
# If no argument is provided, it defaults to "../config/secretsMap.json" relative to the script.

# Determine the location of the secrets map file.
script_dir="$(dirname "$0")"
secretsMapLocation=${1:-"$script_dir/../config/secretsMap.json"}

if [ ! -f "$secretsMapLocation" ]; then
  echo "Secrets map file not found at: $secretsMapLocation"
  exit 1
fi

# Read the JSON array and iterate over each secret map.
# Each secret map is output as a compact JSON object per line.
secretMaps=$(jq -c '.[]' "$secretsMapLocation")
if [ -z "$secretMaps" ]; then
  echo "No secrets found in the secrets map file."
  exit 1
fi

# Process each secret map.
echo "$secretMaps" | while read -r secretMap; do
  # Extract awsSecretName and fields from the current secret map.
  awsSecretName=$(echo "$secretMap" | jq -r '.awsSecretName')
  fields=$(echo "$secretMap" | jq -c '.fields')
  
  # Retrieve the JSON secret string from the environment.
  awsSecretString="${!awsSecretName}"
  if [ -z "$awsSecretString" ]; then
    echo "Error: Secret '$awsSecretName' not found in environment variables."
    exit 1
  fi
  
  # Iterate over each key in the fields object.
  for awsName in $(echo "$fields" | jq -r 'keys[]'); do
    # Get the desired environment variable name; if null or empty, use awsName.
    envName=$(echo "$fields" | jq -r --arg key "$awsName" '.[$key]')
    if [ "$envName" == "null" ] || [ -z "$envName" ]; then
      envName="$awsName"
    fi
    
    # Extract the secret value for the current awsName from the awsSecretString.
    value=$(echo "$awsSecretString" | jq -r --arg key "$awsName" '.[$key]')
    if [ "$value" == "null" ] || [ -z "$value" ]; then
      echo "Error: Value for '$awsName' not found in secret '$awsSecretName'."
      exit 1
    fi
    
    # Export the environment variable.
    export "$envName=$value"
    echo "Setting env var: $envName : $value"
  done
done

echo "Secrets have been loaded as environment variables."
