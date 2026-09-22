// esercizi/giorno1/esercizio-03-soluzione.js
//
// Soluzione dell'esercizio 3: primo server Express personale.
// Esegui con: npm run es:g1:03
// Poi prova le rotte da browser o Thunder Client/Postman.

require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.json({ messaggio: 'Benvenuto nella mia prima API' });
});

app.get('/chi-sono', function (req, res) {
    res.status(200).json({
        nome: 'Fulvia',
        corso: 'Node.js + Express',
        data_inizio: '2026-09-22'
    });
});

// Rotta fissa (senza parametri dinamici: li vedremo il giorno 2 con req.params)
app.get('/saluta/fulvia', function (req, res) {
    res.json({ messaggio: 'Ciao Fulvia!' });
});

// Gestione delle rotte non trovate: DEVE stare dopo tutte le altre rotte,
// altrimenti intercetterebbe anche le richieste valide.
app.use(function (req, res) {
    res.status(404).json({ errore: `Rotta non trovata: ${req.originalUrl}` });
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
