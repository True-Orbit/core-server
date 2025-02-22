import knex from 'knex';

import dotenv from 'dotenv';

dotenv.config();

console.log('cwd: ', process.cwd());

import config from '../../knexfile';

const env = process.env.NODE_ENV || 'local';

console.log('config: ', config[env])

export const dbConnection = knex(config[env]);
