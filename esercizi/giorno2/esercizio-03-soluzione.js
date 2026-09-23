// esercizi/giorno2/esercizio-03-soluzione.js
//
// Soluzione dell'esercizio 3: validazione di un body con più regole.
// Esegui con: npm run es:g2:03

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const LIVELLI_VALIDI = ['base', 'intermedio', 'avanzato'];
let corsi = [];
let prossimoId = 1;

app.post('/corsi', function (req, res) {
    const { titolo, durataOre, livello, postiDisponibili } = req.body;

    // 1. titolo
    if (!titolo || typeof titolo !== 'string' || titolo.trim() === '') {
        return res.status(400).json({ errore: 'Il campo titolo è obbligatorio e non può essere vuoto' });
    }

    // 2. durataOre
    if (durataOre === undefined || typeof durataOre !== 'number' || durataOre <= 0) {
        return res.status(400).json({ errore: 'Il campo durataOre deve essere un numero maggiore di zero' });
    }

    // 3. livello
    if (!livello || !LIVELLI_VALIDI.includes(livello)) {
        return res.status(400).json({
            errore: `Il campo livello deve essere uno tra: ${LIVELLI_VALIDI.join(', ')}`
        });
    }

    // 4. postiDisponibili (opzionale)
    if (postiDisponibili !== undefined) {
        const isIntero = Number.isInteger(postiDisponibili);
        if (!isIntero || postiDisponibili <= 0) {
            return res.status(400).json({ errore: 'Il campo postiDisponibili deve essere un numero intero positivo' });
        }
    }

    const nuovoCorso = {
        id: prossimoId++,
        titolo,
        durataOre,
        livello,
        postiDisponibili: postiDisponibili !== undefined ? postiDisponibili : null
    };
    corsi.push(nuovoCorso);

    res.status(201).json(nuovoCorso);
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
