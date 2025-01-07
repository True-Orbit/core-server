import express from 'express';
import { dbConnection } from '../db/connection';

const router = express.Router();

router.get('/', (req, res) => {
  dbConnection.raw('SELECT 1')
  res.send('Welcome to the Express Server!');
});

export default router;