import express from 'express';
import { changeKeys } from '@/utils';

import { dbConnection } from '@/db';
import { requireUserAuth, requireApiAuth, sanitize } from '@/middleware';
import { catchErrors } from '@/utils';

import { patchFields } from '.';

const router = express.Router();

router.get(
  '/me',
  requireUserAuth,
  catchErrors(async (req, res, _next) => {
    const auth_id = req.authUser!.id;
    const dbUser = await dbConnection('users').where({ auth_id }).first();
    const user = changeKeys({ ...dbUser, role: req.authUser!.role }, 'camelCase');
    res.send(user);
  }),
);

router.patch(
  '/:me',
  requireUserAuth,
  sanitize({ allowed: patchFields, object: 'me'}),
  catchErrors(async (req, res, next) => {
    try {
      const auth_id = req.authUser?.id;
      const dbConformed = changeKeys(req.sanitized.me, 'snakeCase');
      const [user] = await dbConnection('users').where({ auth_id }).update({ ...dbConformed }).returning('*');
      const jsonConformed = changeKeys(user, 'camelCase');
      res.send(jsonConformed);
    } catch (error) {
      next({ message: "Could not update yourself" })
    }
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

export default router;
