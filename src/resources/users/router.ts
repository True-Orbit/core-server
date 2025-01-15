import express from 'express';
import { dbConnection } from '@/db';

const router = express.Router();

router.get('/users', async (req, res, next) => {
  const result = await dbConnection.raw('SELECT * from users');
  res.send(result.rows);
});

export default router;