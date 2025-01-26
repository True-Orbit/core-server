import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

// @ts-expect-error: import knexfile from root
import config from '../../knexfile';

const env = process.env.NODE_ENV || 'local';

export const dbConnection = knex(config[env]);
