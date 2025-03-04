import express from 'express';
import { dbConnection } from '@/db';
import { requireUserAuth, requireApiAuth } from "@/middleware";

const router = express.Router();

router.get('/:id', requireUserAuth, async (req, res, _next) => {
  const id = req.params.id;
  const user = await dbConnection('users').where({ id }).first();
  res.send(user);
});

router.get('/me', requireUserAuth, async (req, res, _next) => {
  const authId = req.authUser!.id;
  const user = await dbConnection('users').where({ authId }).first();
  res.send(user);
});

router.post('/create', requireApiAuth, async (req, res, _next) => {
  const { authId } = req.body;
  const user = await dbConnection('users').insert({ authId });
  res.send(user);
});

router.patch('/:id', requireUserAuth, async (req, res, _next) => {
  const id = req.params.id;
  const authUser = req.authUser!;
  if (authUser.id !== id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const { authId } = req.body;
});

export default router;
