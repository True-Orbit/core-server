import express from 'express';

const router = express.Router();

router.get('/', async (req, res, _next) => {
  res.send('Welcome to the Express Server!');
});

export default router;
