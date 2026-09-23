# Esercizio 1 — Router modulare per la risorsa "libri"

**Argomenti coinvolti:** `express.Router`, `req.params`, `req.query`, route con più
metodi HTTP.

## Obiettivo

Costruire un piccolo router modulare per gestire una lista di libri in memoria,
seguendo lo stesso schema visto per i dipendenti (`esempi/giorno2/router-modulare/`).

Struttura richiesta:

```
esercizio-01-soluzione/
├── app.js
└── routes-libri.js
```

## Dati di partenza (in `routes-libri.js`)

```js
let libri = [
    { id: 1, titolo: 'Il nome della rosa', autore: 'Umberto Eco', genere: 'romanzo' },
    { id: 2, titolo: 'Fondazione', autore: 'Isaac Asimov', genere: 'fantascienza' },
    { id: 3, titolo: 'Se questo è un uomo', autore: 'Primo Levi', genere: 'memoriale' },
    { id: 4, titolo: 'Neuromante', autore: 'William Gibson', genere: 'fantascienza' }
];
```

## Requisiti

1. `GET /libri` — restituisce l'elenco completo. Deve supportare un filtro opzionale
   via **query string** `?genere=fantascienza` (usa `req.query`).
2. `GET /libri/:id` — restituisce il singolo libro (usa `req.params`, convertendo
   l'id in numero). Se non esiste, rispondi con status `404` e un JSON `{ "errore": "..." }`.
3. `POST /libri` — crea un nuovo libro. Richiede `express.json()` montato in `app.js`
   PRIMA delle route.
4. `DELETE /libri/:id` — elimina un libro dall'array. Se l'id non esiste, `404`.
5. Il router va definito in `routes-libri.js` con `express.Router()` e montato in
   `app.js` con `app.use('/libri', router)`.

## Come testarlo

```
GET    http://localhost:3000/libri
GET    http://localhost:3000/libri?genere=fantascienza
GET    http://localhost:3000/libri/2
GET    http://localhost:3000/libri/999      (404)
POST   http://localhost:3000/libri          (body JSON con titolo/autore/genere)
DELETE http://localhost:3000/libri/1
```

La soluzione completa è in `esercizio-01-soluzione/` (`npm run es:g2:01`).
