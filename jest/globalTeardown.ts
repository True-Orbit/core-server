import { dbConnection } from '../src/db';

export default async () => {
  await dbConnection.migrate.rollback();
  await dbConnection.destroy();
};