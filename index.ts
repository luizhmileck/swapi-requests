import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import charactersRoute from './routes/characters';
import planetsRoute from './routes/planets';
import starshipsRoute from './routes/starships';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Set up middleware to serve static files (e.g., CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Define route for serving the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route handlers for other endpoints
app.use('/characters', charactersRoute);
app.use('/planets', planetsRoute);
app.use('/starships', starshipsRoute);

// Server init
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});