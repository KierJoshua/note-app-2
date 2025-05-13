import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import noteRoutes from './routes/note.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use('/api/notes', noteRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
};

startServer();
