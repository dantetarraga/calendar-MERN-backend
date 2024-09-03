import { check } from 'express-validator'

export const emailValidator = [
  check('email', 'Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .normalizeEmail()
]
