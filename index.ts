import express, { Request, Response } from 'express';
import request from 'request';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Main route
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Route to get and display Star Wars characters in alphabetical order
app.get('/characters', (req: Request, res: Response) => {
    request('https://swapi.dev/api/people/', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const characters = data.results.map((character: { name: string }) => character.name).sort();
            res.send(`<h1>Star Wars Characters</h1><ul>${characters.map((character: string) => `<li>${character}</li>`).join('')}</ul>`);
        } else {
            res.status(500).send('Error getting Star Wars characters.');
        }
    });
});

// Planets in order of diameter (from largest to smallest)
app.get('/planets', (req: Request, res: Response) => {
    request('https://swapi.dev/api/planets/', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const planets = data.results.sort((a: { diameter: number }, b: { diameter: number }) => b.diameter - a.diameter).map((planet: { name: string }) => planet.name);
            res.send(`<h1>Star Wars Planets</h1><ul>${planets.map((planet: string) => `<li>${planet}</li>`).join('')}</ul>`);
        } else {
            res.status(500).send('Error getting Star Wars planets.');
        }
    });
});

// Route to get and display Star Wars starships in alphabetical order
app.get('/starships', (req: Request, res: Response) => {
    request('https://swapi.dev/api/starships/', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const starships = data.results.map((starship: { name: string }) => starship.name).sort();
            res.send(`<h1>Star Wars Starships</h1><ul>${starships.map((starship: string) => `<li>${starship}</li>`).join('')}</ul>`);
        } else {
            res.status(500).send('Error getting Star Wars starships.');
        }
    });
});

// Server initialization
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});