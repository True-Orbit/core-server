import dotenv from "dotenv";
dotenv.config();

const migrations = {
  directory: './src/db/migrations',
};

const seeds = {
  directory: './src/db/seeds',
};

const config = {
  local: {
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