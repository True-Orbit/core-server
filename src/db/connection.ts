import knex from 'knex';
// @ts-expect-error: import knexfile from root
import config from '../../knexfile';

export const dbConnection = knex(config.development);
