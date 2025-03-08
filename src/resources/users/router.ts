import express from 'express';
import { dbConnection } from '@/db';
import { requireUserAuth, requireApiAuth } from '@/middleware';
import { catchErrors, keysToSnakeCase, keysToCamelCase } from '@/utils';

const router = express.Router();

router.get(
  '/me',
  requireUserAuth,
  catchErrors(async (req, res, _next) => {
    const auth_id = req.authUser!.id;
    const dbUser = await dbConnection('users').where({ auth_id }).first();
    const user = keysToCamelCase({ ...dbUser, role: req.authUser!.role });
    res.send(user);
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
    const { authId: auth_id } = req.body.user;
    const user = await dbConnection('users').insert({ auth_id }).returning('*');
    res.send(user);
  }),
);

router.patch(
  '/:id',
  requireUserAuth,
  catchErrors(async (req, res, _next) => {
    const dbConformed = keysToSnakeCase(req.body.user);
    const user = await dbConnection('users').update(dbConformed).returning('*');
    const jsonConformed = keysToCamelCase(user);
    res.send(jsonConformed);
  }),
);

export default router;
