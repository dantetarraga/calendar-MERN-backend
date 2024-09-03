import { Schema, model } from 'mongoose'

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

EventSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

export const Event = model('Event', EventSchema)
