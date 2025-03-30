import { body } from 'express-validator';
import { dbConnection } from '@/db';

export const validate = body('user')
  .isEmail()
  .withMessage('Please provide a valid user')
  .normalizeEmail()
  .custom(async (email) => {
    const existingUser = await dbConnection('users').where({ email }).first();

    if (existingUser) {
      throw new Error('Email already registered');
    }
    return true;
  });
