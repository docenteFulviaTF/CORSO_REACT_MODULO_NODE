// esempi/giorno3/02-tipi-middleware.js
//
// Argomento: middleware di applicazione, di router, di errore.
// Esegui con: npm run g3:02
//
// Prova:
//   GET http://localhost:3000/               (solo middleware di applicazione globale)
//   GET http://localhost:3000/api/qualcosa    (globale + quello specifico per /api)
//   GET http://localhost:3000/dipendenti      (globale + middleware di router)
//   GET http://localhost:3000/errore          (attiva il middleware di errore)

const express = require('express');
const app = express();
const PORT = 3000;

// --- Middleware DI APPLICAZIONE: app.use(), eseguito per OGNI richiesta ---
app.use(function (req, res, next) {
  console.log(`Middleware di applicazione [${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware di applicazione ma legato a un prefisso: eseguito solo per /api/*
app.use('/api', function (req, res, next) {
  console.log('Richiesta alle API dal middleware di applicazione');
  next();
});

app.get('/', function (req, res) {
  res.json({messaggio: 'Home'});
});

app.get('/api/qualcosa', function (req, res) {
  res.json({messaggio: 'Risposta API'});
});

// --- Middleware DI ROUTER: si registra su un express.Router(), vale solo per quel router ---
const routerDip = express.Router();

routerDip.use(function (req, res, next) {
  console.log('Richiesta di middleware al router dipendenti');
  next();
});

routerDip.get('/', function (req, res) {
  res.json({messaggio: 'Elenco dipendenti'});
});

app.use('/dipendenti', routerDip);

const routerFornitori = express.Router();

routerFornitori.use(function (req, res, next) {
  console.log('Richiesta di middleware al router fornitori');
  next();
});

routerFornitori.get('/', function (req, res) {
  res.json({messaggio: 'Elenco fornitori'});
});

routerFornitori.get('/:id', function (req, res, next) {
  //res.json({messaggio: 'dati fornitore con id ' + req.params.id});
  next(new Error('Errore di esempio generato per fornitore' + req.params.id));
});

app.use('/fornitori', routerFornitori);

// Rotta di comodo per vedere il middleware di errore in azione
app.get('/errore', function (req, res, next) {
  console.log('middleware intermedio che genera un errore');
  next(new Error('Errore di esempio per il middleware di errore'));
});

// --- Middleware DI ERRORE: si riconosce dai 4 parametri, va sempre eseguito solo con next(err) ---
app.use(function (err, req, res, next) {
  //console.error(err.stack);
  console.error('errore intercettato dal middleware di errore');
  res.status(err.status || 500).json({errore: err.message});
});

app.listen(PORT, function () {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
