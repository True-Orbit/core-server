import { body } from 'express-validator';

export const me = [
  body('me.firstName').trim().escape().notEmpty().withMessage('First name is required'),
  body('me.lastName').trim().escape().notEmpty().withMessage('Last name is required'),
  body('me.handle')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Handle is required')
    .isAlphanumeric()
    .withMessage('Handle must be alphanumeric'),
];

export const create = [body('user.authId').trim().escape().notEmpty().withMessage('authId is required')];
