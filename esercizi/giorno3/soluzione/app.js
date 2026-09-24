// esercizi/giorno3/soluzione/app.js
//
// Soluzione dell'esercizio del giorno 3: API REST "Gestione Libreria".
// Esegui con: npm run es:g3

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const libriRouter = require('./routes/libri');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/libri', libriRouter);

app.get('/', function (req, res) {
    res.json({ messaggio: 'API Gestione Libreria', versione: '1.0' });
});

app.use(function (req, res) {
    res.status(404).json({ errore: 'Risorsa non trovata' });
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({ errore: err.message });
});

app.listen(PORT, function () {
    console.log(`Server "Gestione Libreria" avviato su http://localhost:${PORT}`);
});
