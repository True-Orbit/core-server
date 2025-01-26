import express from 'express';
import { memoryUsage, uptime } from 'process';

const router = express.Router();

router.get('/health', async (req, res, _next) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is healthy',
    time: new Date().toISOString(),
    uptime: uptime(),
    memoryUsage: memoryUsage(),
  });
});

export default router;
