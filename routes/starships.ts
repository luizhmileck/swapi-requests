// starships.ts
import express from 'express';
import request from 'request';

const router = express.Router();

router.get('/', (req, res) => {
    request('https://swapi.dev/api/starships/', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const starships = data.results.map((starship: { name: string }) => starship.name).sort();
            res.render('starships', { starships });
        } else {
            res.status(500).send('Error getting Star Wars starships.');
        }
    });
});

export default router;