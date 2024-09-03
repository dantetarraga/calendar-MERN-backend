import { check } from 'express-validator'

export const passwordValidator = [
  check('password', 'Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
]
