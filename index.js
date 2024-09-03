import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './database/config.js'
import authRouter from './routes/auth.js'
import eventsRouter from './routes/events.js'

dotenv.config()

const app = express()
connectDB()

// Middlewares
app.use(cors())
app.use(express.static('public'))
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/events', eventsRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
