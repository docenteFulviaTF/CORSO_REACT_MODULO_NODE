// esercizi/giorno2/esercizio-02-soluzione.js
//
// Soluzione dell'esercizio 2: gestione errori centralizzata.
// Esegui con: npm run es:g2:02

const express = require('express');
const app = express();
const PORT = 3000;

const film = [
    { id: 1, titolo: 'Blade Runner' },
    { id: 2, titolo: 'Arrival' }
];

function trovaFilm(id) {
    return film.find(f => f.id === id);
}

function trovaFilmAsync(id) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve(trovaFilm(id)), 150);
    });
}

app.get('/film/:id', function (req, res, next) {
    try {
        const trovato = trovaFilm(parseInt(req.params.id));
        if (!trovato) {
            const err = new Error(`Film con id ${req.params.id} non trovato`);
            err.status = 404;
            return next(err);
        }
        res.json(trovato);
    } catch (e) {
        next(e);
    }
});

app.get('/film-async/:id', async function (req, res, next) {
    try {
        const trovato = await trovaFilmAsync(parseInt(req.params.id));
        if (!trovato) {
            const err = new Error(`Film con id ${req.params.id} non trovato`);
            err.status = 404;
            return next(err);
        }
        res.json(trovato);
    } catch (e) {
        next(e);
    }
});

app.get('/errore-generico', function (req, res, next) {
    try {
        throw new Error('Errore generico non previsto');
    } catch (e) {
        next(e); // nessun err.status -> il middleware userà 500
    }
});

// catch-all 404: dopo tutte le route
app.use(function (req, res) {
    res.status(404).json({ errore: `Rotta non trovata: ${req.originalUrl}` });
});

// middleware di errore: sempre per ultimo, sempre 4 parametri
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({
        errore: err.message || 'Errore interno del server'
    });
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
