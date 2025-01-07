import type { Knex } from 'knex';
import dotenv from "dotenv";
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const migrations = {
  directory: './migrations',
};

const seeds = {
  directory: './seeds',
};

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations,
    seeds,
  },
};

export default config;