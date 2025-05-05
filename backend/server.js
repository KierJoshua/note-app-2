import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { connectDB } from './config/db.js';
import noteRoutes from './routes/note.routes.js';

const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json())

app.use(`${import.meta.env.VITE_BACKEND_URL}/notes`, noteRoutes)
  

app.listen(5000, ()=> {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`)
})