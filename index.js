import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './database/config.js'
import authRouter from './routes/auth.js'
import eventsRouter from './routes/events.js'
import { fileURLToPath } from 'url'
import serviceRouter from './routes/service.js'

dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
connectDB()

// Middlewares
app.use(cors())
app.use(express.static('public'))
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/events', eventsRouter)
app.use('/api/service', serviceRouter)

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
