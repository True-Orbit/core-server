import express from 'express';
import { memoryUsage, uptime } from 'process';

const router = express.Router();

router.get('', (req, res, _next) => {
  res.status(200).send({
    status: 'ok',
    message: 'API is healthy',
    time: new Date().toISOString(),
    uptime: uptime(),
    memoryUsage: memoryUsage(),
  });
});

export default router;
