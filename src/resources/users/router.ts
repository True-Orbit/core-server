import express from 'express';
import { dbConnection } from '@/db';
import { requireUserAuth, requireApiAuth } from '@/middleware';
import { catchErrors } from '@/utils';

const router = express.Router();

router.get(
  '/me',
  requireUserAuth,
  catchErrors(async (req, res, _next) => {
    const auth_id = req.authUser!.id;
    const user = await dbConnection('users').where({ auth_id }).first();
    res.send({ ...user, role: req.authUser!.role });
  }),
);

router.get(
  '/:id',
  requireUserAuth,
  catchErrors(async (req, res, _next) => {
    const id = req.params.id;
    const user = await dbConnection('users').where({ id }).first();
    res.send(user);
  }),
);

router.post(
  '/create',
  requireApiAuth,
  catchErrors(async (req, res, _next) => {
    const { authId: auth_id } = req.body;
    const user = await dbConnection('users').insert({ auth_id }).returning('*');
    res.send(user);
  }),
);

router.patch(
  '/:id',
  requireUserAuth,
  catchErrors(async (req, res, _next) => {
    const user = await dbConnection('users').update(req.body).returning('*');
    res.send(user);
  }),
);

export default router;
