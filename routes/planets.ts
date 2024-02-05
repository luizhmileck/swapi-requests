import express from 'express';
import request from 'request';

const router = express.Router();

router.get('/', (req, res) => {
    request('https://swapi.dev/api/planets/', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const planets = data.results.sort((a: { diameter: number }, b: { diameter: number }) => b.diameter - a.diameter).map((planet: { name: string }) => planet.name);
            res.render('planets', { planets });
        } else {
            res.status(500).send('Error getting Star Wars planets.');
        }
    });
});

export default router;