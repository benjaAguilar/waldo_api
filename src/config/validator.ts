import { body } from 'express-validator';

export const validateUsername = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 4, max: 20 })
    .withMessage(
      'Username has to be at least 4 characters and a maximum of 20 characters',
    )
    .isAlphanumeric()
    .withMessage('Username can only contain aplhanumeric caracters'),
];
