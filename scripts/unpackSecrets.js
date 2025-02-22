#!/usr/bin/env node

/**
 * This script is used to unpack aws secrets manager secrets
 * secretsMap.json file should be present in the config folder
 * json should be an array of secret maps
 *  [
 *   {
 *    "awsSecretName": "someName",
 *    "fields": {
 *        awsName: "envName",
 *        awsName2: "envName2",
 *      }
 *     ]
 *   },
 *  }
 *  If field is not listed, it will be ignored
 *  if envName is undefined, it be set to awsName
 */

const fs = require('fs');
const fsPromise = fs.promises;
const path = require('path');

const args = process.argv.slice(2);
const secretsMapLocation = args[0] || './config/secretsMap.json';
const secretsMapFile = path.join(__dirname, secretsMapLocation);

if (!fs.existsSync(secretsMapFile)) {
  throw "Secrets map file not found";
}

async function readSecretsMap() {
  try {
    const data = await fsPromise.readFile(secretsMapFile, 'utf8');
    const secretsMapArray = JSON.parse(data) ?? [];
    if (!Array.isArray(secretsMapArray)) {
      throw "Secrets map file should be an array";
    }
    return secretsMapArray;
  } catch (err) {
    throw `Error reading file: ${err}`;
  }
}

const setEnvVars = (secretsMapArray) => {
  for (const awsSecretMap of secretsMapArray) {
    const { awsSecretName, fields } = awsSecretMap;
  
    const awsSecretString = process.env[awsSecretName];
    if (!awsSecretString) {
      throw `Secret ${awsSecretName} not found in environment variables`;
    }
    const awsSecret = JSON.parse(awsSecretString);
  
    for (const [awsName, envName] of Object.entries(fields)) {
      const value = awsSecret[awsName];
      if (!value) throw `Value for ${awsName} not found in secret`;
  
      process.env[envName ?? awsName] = value;
      console.log('Setting env var: ', envName ?? awsName)
    }
  }
  
  console.log("Secrets have been loaded as environment variables.");
}

readSecretsMap().then(setEnvVars).then(() => {
  process.exit(0);
}).catch((err) => {
  console.error('Error reading secrets map:', err);
  process.exit(1);
});
