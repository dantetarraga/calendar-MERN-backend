import { check } from 'express-validator'

export const fullNameValidator = [
  check('firstName', 'first name is required')
    .not()
    .isEmpty(),
  check('lastName', 'Last name is required')
    .not()
    .isEmpty()
]
