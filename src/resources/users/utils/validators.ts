const { body, validationResult } = require('express-validator');

export const patchValidator = [
  body('user.firstName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('First name is required'),
  body('user.lastName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Last name is required'),
  body('user.handle')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Handle is required')
    .isAlphanumeric()
    .withMessage('Handle must be alphanumeric'),
];