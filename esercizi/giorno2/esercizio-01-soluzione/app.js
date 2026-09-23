// esercizi/giorno2/esercizio-01-soluzione/app.js
//
// Esegui con: npm run es:g2:01

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());   // necessario prima delle route che leggono req.body

const libriRouter = require('./routes-libri');
app.use('/libri', libriRouter);

app.listen(PORT, function () {
    console.log(`Server "libri" in ascolto su http://localhost:${PORT}`);
});
