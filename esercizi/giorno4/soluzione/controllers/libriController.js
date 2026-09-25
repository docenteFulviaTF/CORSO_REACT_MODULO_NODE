// esercizi/giorno3/soluzione/controllers/libriController.js

const {libri, getProssimoId} = require('../data/libri');

// GET /libri — con filtro opzionale ?genere=...
function getAll(req, res) {
  console.log('getAll ingresso');
  const {genere} = req.query;
  let risultati = libri;
  if (genere) {
    risultati = libri.filter(l => l.genere && l.genere.toLowerCase() === genere.toLowerCase());
  }
  console.log('getAll prima di res.json');
  res.json({totale: risultati.length, dati: risultati});
}

// GET /libri/:id
function getById(req, res) {
  const id = parseInt(req.params.id);
  const libro = libri.find(l => l.id === id);
  if (!libro) {
    return res.status(404).json({errore: `Libro con id ${id} non trovato`});
  }
  res.json(libro);
}

// POST /libri
function create(req, res) {
  const {titolo, autore, genere, anno} = req.body;
  if (!titolo || !autore) {
    return res.status(400).json({errore: 'I campi titolo e autore sono obbligatori'});
  }
  const nuovoLibro = {
    id: getProssimoId(),
    titolo,
    autore,
    genere: genere || null,
    anno: anno || null
  };
  libri.push(nuovoLibro);
  res.status(201).json(nuovoLibro);
}

// PUT /libri/:id — sostituzione completa
function update(req, res) {
  const id = parseInt(req.params.id);
  const indice = libri.findIndex(l => l.id === id);
  if (indice === -1) {
    return res.status(404).json({errore: `Libro con id ${id} non trovato`});
  }
  const {titolo, autore, genere, anno} = req.body;
  if (!titolo || !autore) {
    return res.status(400).json({errore: 'I campi titolo e autore sono obbligatori'});
  }
  libri[indice] = {id, titolo, autore, genere: genere || null, anno: anno || null};
  res.json(libri[indice]);
}

// DELETE /libri/:id
function remove(req, res) {
  const id = parseInt(req.params.id);
  const indice = libri.findIndex(l => l.id === id);
  if (indice === -1) {
    return res.status(404).json({errore: `Libro con id ${id} non trovato`});
  }
  libri.splice(indice, 1);
  res.status(204).end();
}

module.exports = {getAll, getById, create, update, remove};
