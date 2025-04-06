import 'module-alias/register';
import { dbConnection } from '@/db';

export default async () => {
  await dbConnection.migrate.latest();
};