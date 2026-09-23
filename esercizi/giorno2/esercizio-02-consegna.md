# Esercizio 2 — Gestione errori centralizzata

**Argomenti coinvolti:** middleware di errore (4 parametri), `next(err)`, 404 in JSON,
route asincrone con try/catch.

## Obiettivo

Scrivere un server `esercizio-02-soluzione.js` con una piccola "libreria" di film in
memoria e una gestione degli errori centralizzata e coerente su tutte le rotte.

## Dati di partenza

```js
const film = [
    { id: 1, titolo: 'Blade Runner' },
    { id: 2, titolo: 'Arrival' }
];
```

## Requisiti

1. `GET /film/:id` — se il film non esiste, crea un `Error`, imposta `err.status = 404`
   e passalo con `next(err)` (non rispondere direttamente con `res.status(404)` dentro
   la route: deve passare dal middleware di errore).
2. `GET /film-async/:id` — stessa logica della rotta precedente, ma dentro una funzione
   `async`, con la ricerca del film "finta-asincrona" (usa una `Promise`/`setTimeout`
   come nell'esempio `esempi/giorno2/07-gestione-errori-middleware.js`). Gestisci
   l'errore con `try/catch` e `next(e)`.
3. `GET /errore-generico` — una rotta che lancia volutamente un errore generico
   (senza `err.status`), per verificare che il middleware risponda con `500` di default.
4. Un middleware **404 catch-all** per qualsiasi rotta non definita, DOPO tutte le altre.
5. Un middleware di **errore** con 4 parametri (`err, req, res, next`), registrato per
   ultimo, che:
   - fa `console.error(err.stack)`;
   - risponde con `err.status || 500`;
   - risponde con un JSON `{ "errore": err.message || 'Errore interno del server' }`.

## Come verificarlo

```
GET http://localhost:3000/film/1          -> 200
GET http://localhost:3000/film/999        -> 404 { "errore": "..." }
GET http://localhost:3000/film-async/2    -> 200
GET http://localhost:3000/film-async/999  -> 404
GET http://localhost:3000/errore-generico -> 500
GET http://localhost:3000/non-esiste      -> 404 (catch-all)
```

La soluzione completa è in `esercizio-02-soluzione.js` (`npm run es:g2:02`).
