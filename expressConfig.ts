import express from 'express';
import path from 'path';

const app = express();

// Set up static files
app.use(express.static('public'));

// Set up views
app.set('views', path.join(__dirname, 'views'));

//Setup engine
app.set('view engine', 'ejs');

export default app;