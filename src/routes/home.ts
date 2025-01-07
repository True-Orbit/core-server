import express from 'express';
import { dbConnection } from '@/db';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = dbConnection.raw('SELECT 1');
  console.log(result);
  res.send('Welcome to the Express Server!');
});

export default router;