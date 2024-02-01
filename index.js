const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Main route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Rota para obter e exibir os personagens de Star Wars em ordem alfabética
app.get('/characters', (req, res) => {
    request('https://swapi.dev/api/people/', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const characters = data.results.map(character => character.name).sort();
            res.send(`<h1>Personagens de Star Wars</h1><ul>${characters.map(character => `<li>${character}</li>`).join('')}</ul>`);
        } else {
            res.status(500).send('Erro ao obter os personagens de Star Wars.');
        }
    });
});

// Planetas em ordem de diâmetro (do maior para o menor)
app.get('/planets', (req, res) => {
    request('https://swapi.dev/api/planets/', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const planets = data.results.sort((a, b) => b.diameter - a.diameter).map(planet => planet.name);
            res.send(`<h1>Planetas de Star Wars</h1><ul>${planets.map(planet => `<li>${planet}</li>`).join('')}</ul>`);
        } else {
            res.status(500).send('Erro ao obter os planetas de Star Wars.');
        }
    });
});

// Rota para obter e exibir as naves de Star Wars em ordem alfabética
app.get('/starships', (req, res) => {
    request('https://swapi.dev/api/starships/', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const starships = data.results.map(starship => starship.name).sort();
            res.send(`<h1>Naves de Star Wars</h1><ul>${starships.map(starship => `<li>${starship}</li>`).join('')}</ul>`);
        } else {
            res.status(500).send('Erro ao obter as naves de Star Wars.');
        }
    });
});

// Init do server
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});