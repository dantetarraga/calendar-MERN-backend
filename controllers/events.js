import { Event } from '../models/Events.js'
class EventsController {
  static async getEvents (req, res) {
    const events = await Event.find().populate('user', 'firstName lastName email')

    res.status(200).json({
      ok: true,
      message: 'Events retrieved successfully',
      events
    })
  }

  static async createEvent (req, res) {
    const { title, start, end, description } = req.body
    const user = req.uid

    const eventData = { title, start, end, user }

    if (description !== undefined) eventData.description = description

    const event = new Event(eventData)
    const newEvent = await event.save()

    if (!newEvent) {
      return res.status(500).json({
        ok: false,
        message: 'Error creating event'
      })
    }

    return res.status(201).json({
      ok: true,
      message: 'Event created successfully',
      event
    })
  }

  static async updateEvent (req, res) {
    const eventId = req.params.id
    const uid = req.uid

    try {
      const event = await Event.findById(eventId)

      if (!event) {
        return res.status(404).json({
          ok: false,
          message: 'Event not found'
        })
      }

      if (event.user.toString() !== uid) {
        return res.status(401).json({
          ok: false,
          message: 'Unauthorized'
        })
      }

      const newEvent = {
        ...req.body,
        user: uid
      }

      const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

      return res.status(200).json({
        ok: true,
        message: 'Event updated successfully',
        event: updatedEvent
      })
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: 'Error updating event'
      })
    }
  }

  static async deleteEvent (req, res) {
    const eventId = req.params.id
    const uid = req.uid

    try {
      const event = await Event.findById(eventId)

      if (!event) {
        return res.status(404).json({
          ok: false,
          message: 'Event not found'
        })
      }

      if (event.user.toString() !== uid) {
        return res.status(401).json({
          ok: false,
          message: 'Unauthorized'
        })
      }

      await Event.findByIdAndDelete(eventId)

      return res.status(200).json({
        ok: true,
        message: 'Event deleted successfully'
      })
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: 'Error deleting event'
      })
    }
  }
}

export default EventsController
