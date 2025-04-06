import 'module-alias/register';
import { dbConnection } from '../src/db';

export default async () => {
  await dbConnection.migrate.latest();
};