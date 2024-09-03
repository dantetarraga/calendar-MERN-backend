import { check } from 'express-validator'
import { isDate } from '../helpers/isDate.js'

export const eventValidator = [
  check('title', 'Title is required').not().isEmpty(),
  check('start', 'Start date is required').custom(isDate),
  check('end', 'End date is required').custom(isDate)
]
