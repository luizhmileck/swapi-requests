import express from 'express';
import request from 'request';

const router = express.Router();

router.get('/', (req, res) => {
    request('https://swapi.dev/api/films/', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            const movies = data.results.sort((a: { release_date: string }, b: { release_date: string }) => {
                return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
            });
            res.render('movies', { movies });
        } else {
            res.status(500).send('Error getting Star Wars movies.');
        }
    });
});

export default router;