// esercizi/giorno2/esercizio-01-soluzione/routes-libri.js
//
// Soluzione dell'esercizio 1: router modulare per la risorsa "libri".

const express = require('express');
const router = express.Router();

let libri = [
  {id: 1, titolo: 'Il nome della rosa', autore: 'Umberto Eco', genere: 'romanzo'},
  {id: 2, titolo: 'Fondazione', autore: 'Isaac Asimov', genere: 'fantascienza'},
  {id: 3, titolo: 'Se questo è un uomo', autore: 'Primo Levi', genere: 'memoriale'},
  {id: 4, titolo: 'Neuromante', autore: 'William Gibson', genere: 'fantascienza'}
];

let prossimoId = libri.length;

// GET /libri  (con filtro opzionale ?genere=...)
router.get('/', function (req, res) {
  const {genere} = req.query;
  let risultati = libri;
  if (genere) {
    risultati = libri.filter(l => l.genere.toLowerCase() === genere.toLowerCase());
  }
  res.json({totale: risultati.length, dati: risultati});
});

// GET /libri/:id
router.get('/:id', function (req, res) {
  const id = parseInt(req.params.id);
  const libro = libri.find(l => l.id === id);
  if (!libro) {
    return res.status(404).json({errore: `Libro con id ${id} non trovato`});
  }
  res.json(libro);
});

// POST /libri
router.post('/', function (req, res) {
  const {titolo, autore, genere} = req.body;
  if (!titolo || !autore) {
    return res.status(400).json({errore: 'I campi titolo e autore sono obbligatori'});
  }
  const nuovoLibro = {id: prossimoId++, titolo, autore, genere: genere || 'non specificato'};
  libri.push(nuovoLibro);
  res.status(201).json(nuovoLibro);
});

// DELETE /libri/:id
router.delete('/:id', function (req, res) {
  const id = parseInt(req.params.id);
  const indice = libri.findIndex(l => l.id === id);
  if (indice === -1) {
    return res.status(404).json({errore: `Libro con id ${id} non trovato`});
  }
  libri.splice(indice, 1);
  res.status(204).end();
});

module.exports = router;
