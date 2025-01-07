// import dotenv from 'dotenv';
import knex from 'knex';
import { config } from './knexfile';

// dotenv.config();


export const dbConnection = knex(config.development);

// dbConnection.raw('SELECT 1')
//   .then(() => {
//     console.log('Database connection successful.');
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error('Database connection failed:', err);
//     process.exit(1);
//   });

// export default dbConnection;
