import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { connectDB } from './config/db.js'
import noteRoutes from './routes/note.routes.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(express.json())

app.use(cors({
  origin: 'https://note-app-2-6yq1.vercel.app', // use your actual frontend URL here
  credentials: true
}))

app.use('/api/notes', noteRoutes)

app.listen(PORT, () => {
  connectDB()
  console.log(`Server started at http://localhost:${PORT}`)
})
