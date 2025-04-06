import fs from 'fs';
import { type Knex } from 'knex';

import dotenv from "dotenv";
dotenv.config();

const caCert = fs.readFileSync(process.env.RDS_PEM_LOCATION || '', 'utf8');

const migrations = {
  directory: './src/db/migrations',
};

const seeds = {
  directory: './src/db/seeds',
};

const connection = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const config: { [key: string]: Knex.Config } = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3',
    },
    useNullAsDefault: true,
    migrations,
    seeds,
    pool: {
      // Ensure the database is ready when your tests run
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      afterCreate: (conn: any, done: any) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  },
  
  local: {
    client: process.env.DB_CLIENT,
    connection,
    migrations,
    seeds,
  },

  development: {
    client: process.env.DB_CLIENT,
    connection: {
      ...connection,
      ssl: { ca: caCert },
    },
    migrations,
    seeds,
    pool: { min: 2, max: 10 },
  }
};

export default config;