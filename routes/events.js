import { Router } from 'express'
import { validateToken } from '../middlewares/validateToken.js'
import { eventValidator } from '../validators/index.js'
import { validatorFields } from '../middlewares/validatorFields.js'
import EventsController from '../controllers/events.js'

const eventsRouter = Router()

// Middleware to validate token
eventsRouter.use(validateToken)

// Routes
eventsRouter.get('/', EventsController.getEvents)
eventsRouter.put(
  '/update/:id',
  [...eventValidator],
  validateToken,
  EventsController.updateEvent
)
eventsRouter.post(
  '/create',
  [...eventValidator],
  validatorFields,
  EventsController.createEvent
)
eventsRouter.delete('/delete/:id', validateToken, EventsController.deleteEvent)

export default eventsRouter
