// esercizi/giorno4/soluzione/app.js
//
// Soluzione dell'esercizio del giorno 4: API "Gestione Libreria" protetta con JWT.
// Esegui con: npm run es:g4
//
// Come testarlo:
//   1. POST http://localhost:3000/auth/login  { "username": "admin", "password": "password123" }
//   2. GET  http://localhost:3000/libri       con header Authorization: Bearer <token>
//   3. DELETE http://localhost:3000/libri/2   con token di "bibliotecario" -> 403
//      DELETE http://localhost:3000/libri/2   con token di "admin"        -> 204

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const verificaJWT = require('./middleware/verificaJWT');
const authRouter = require('./routes/auth');
const libriRouter = require('./routes/libri');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRouter);

// Tutte le rotte /libri richiedono un token JWT valido.
// Il controllo del ruolo (solo admin per la DELETE) è dentro routes/libri.js.
app.use('/libri', verificaJWT, libriRouter);

app.get('/', function (req, res) {
    res.json({ messaggio: 'API Gestione Libreria (protetta con JWT)', versione: '2.0' });
});

app.use(function (req, res) {
    res.status(404).json({ errore: 'Risorsa non trovata' });
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({ errore: err.message });
});

app.listen(PORT, function () {
    console.log(`Server "Gestione Libreria" (JWT) avviato su http://localhost:${PORT}`);
});
