import knex from 'knex';
// @ts-ignore
import config from './knexfile';

const dbConnection = knex(config.development);

dbConnection.raw('SHOW TABLES')
.then(res => console.log(res[0].map(row => Object.values(row)[0])))
.catch(err => console.error(err))
.finally(() => dbConnection.destroy());