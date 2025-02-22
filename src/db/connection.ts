import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

import config from '@/root/knexfile';

const env = process.env.NODE_ENV || 'local';

console.log('config: ', config[env])

export const dbConnection = knex(config[env]);
