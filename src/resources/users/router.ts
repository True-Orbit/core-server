import express from 'express';
import { changeKeys, catchErrors } from '@/utils';

import { dbConnection } from '@/db';
import { requireUserAuth, requireApiAuth, allowProps, validate } from '@/middleware';

import { patchFields, validators } from '.';

const router = express.Router();

router.get(
  '/me',
  requireUserAuth,
  catchErrors(async (req, res, _next) => {
    const auth_id = req.authUser!.id;
    const dbUser = await dbConnection('users').where({ auth_id }).first();
    const user = changeKeys({ ...dbUser, role: req.authUser!.role }, 'camelCase');
    return res.send(user);
  }),
);

router.patch(
  '/:me',
  requireUserAuth,
  validate(validators.me),
  allowProps({ allowed: patchFields, object: 'me' }),
  catchErrors(async (req, res, next) => {
    try {
      const auth_id = req.authUser?.id;
      const dbConformed = changeKeys(req.allowed.me, 'snakeCase');
      const [user] = await dbConnection('users')
        .where({ auth_id })
        .update({ ...dbConformed })
        .returning('*');
      const jsonConformed = changeKeys(user, 'camelCase');
      return res.send(jsonConformed);
    } catch (err) {
      console.error(err);
      return next({ message: 'Could not update yourself' });
    }
  }),
);

router.get(
  '/:id',
  requireUserAuth,
  catchErrors(async (req, res, next) => {
    const id = req.params.id;
    const user = await dbConnection('users').where({ id }).first();
    if (user) return res.send(user);
    return next({ status: 404, message: 'User not found' });
  }),
);

router.post(
  '/create',
  requireApiAuth,
  validate(validators.create),
  catchErrors(async (req, res, _next) => {
    const { authId: auth_id } = req.body.user;
    const user = await dbConnection('users').insert({ auth_id }).returning('*');
    return res.send(user);
  }),
);

export default router;
