import express from 'express';
import request from 'request';

const router = express.Router();

router.get('/', (req, res) => {
    request('https://swapi.dev/api/people/', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const characters = data.results.map((character: { name: string }) => character.name).sort();
            res.render('characters', { characters });
        } else {
            res.status(500).send('Error getting Star Wars characters.');
        }
    });
});

export default router;