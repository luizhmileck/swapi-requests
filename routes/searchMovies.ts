import express from 'express';
import request from 'request';
import { Movie } from './types'; // Import the Movie type

const router = express.Router();

router.get('/', (req, res) => {
    const query = req.query.q ? String(req.query.q) : ''; // Get the search query from the URL parameter, or default to an empty string if it's undefined

    // Fetch movies from the API
    request('https://swapi.dev/api/films/', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            const movies: Movie[] = data.results;

            // Filter the movies array based on the search query
            const filteredMovies = movies.filter((movie: Movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
            res.render('movies', { movies: filteredMovies });
        } else {
            res.status(500).send('Error getting Star Wars movies.');
        }
    });
});

export default router;
