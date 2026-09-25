// esercizi/giorno4/soluzione/routes/libri.js
//
// Identico al giorno 3, con un'aggiunta: la DELETE ora richiede il ruolo 'admin'.
// verificaJWT gira prima (montato in app.js) e imposta req.utente; qui applichiamo
// solo il controllo del ruolo sulla singola rotta.

const express = require('express');
const router = express.Router();
const controller = require('../controllers/libriController');
const verificaRuolo = require('../middleware/verificaRuolo');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);

// Solo gli admin possono eliminare un libro
router.delete('/:id', verificaRuolo('admin'), controller.remove);

module.exports = router;
