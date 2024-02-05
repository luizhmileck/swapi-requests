import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import expressLayouts from 'express-ejs-layouts';
import charactersRoute from './routes/characters';
import planetsRoute from './routes/planets';
import starshipsRoute from './routes/starships';

// Set up static files

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Set up middleware to serve static files (e.g., CSS, images)
app.use(express.static('public'));

// Set up views
app.set('views', path.join(__dirname, 'views'));

// Setup engine
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Route handlers for other endpoints
// app.use(expressLayouts);
app.use('/characters', charactersRoute);
app.use('/planets', planetsRoute);
app.use('/starships', starshipsRoute);

// Define route for serving the main page
app.get('/', (req, res) => {
    // Render the 'index.ejs' view directly
    res.render('index', { title: 'Main Page' });
});

// Server init
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});