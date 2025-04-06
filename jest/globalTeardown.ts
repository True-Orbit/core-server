import { dbConnection } from '@/db';

export default async () => {
  await dbConnection.migrate.rollback();
  await dbConnection.destroy();
};