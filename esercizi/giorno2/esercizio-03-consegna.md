# Esercizio 3 — Validazione di un body con più regole

**Argomenti coinvolti:** `req.body`, validazione manuale, status `400`.

## Obiettivo

Scrivere un server `esercizio-03-soluzione.js` con una rotta `POST /corsi` che crea
un corso, validando il body ricevuto secondo più regole.

## Requisiti di validazione

Il body atteso è:

```json
{
  "titolo": "Node.js avanzato",
  "durataOre": 32,
  "livello": "intermedio",
  "postiDisponibili": 15
}
```

La rotta deve rispondere `400` con un messaggio d'errore **specifico** (non generico)
per ciascuno di questi casi, controllati in quest'ordine:

1. `titolo` mancante o stringa vuota.
2. `durataOre` mancante, non numerico, o minore/uguale a 0.
3. `livello` mancante o non uguale a uno tra `"base"`, `"intermedio"`, `"avanzato"`.
4. `postiDisponibili` presente ma non è un numero intero positivo (se assente va bene:
   è opzionale, e in quel caso usa `null` come valore di default nella risposta).

Se tutte le verifiche passano, rispondi `201` con l'oggetto corso creato
(aggiungendo un `id` incrementale, come negli esempi già visti).

## Come verificarlo

Prova questi body su `POST http://localhost:3000/corsi`:

```json
{ "durataOre": 32, "livello": "intermedio" }
// -> 400, titolo mancante

{ "titolo": "Node.js avanzato", "durataOre": 0, "livello": "intermedio" }
// -> 400, durata non valida

{ "titolo": "Node.js avanzato", "durataOre": 32, "livello": "esperto" }
// -> 400, livello non valido

{ "titolo": "Node.js avanzato", "durataOre": 32, "livello": "intermedio", "postiDisponibili": -3 }
// -> 400, posti non validi

{ "titolo": "Node.js avanzato", "durataOre": 32, "livello": "intermedio" }
// -> 201, creato con postiDisponibili: null
```

La soluzione completa è in `esercizio-03-soluzione.js` (`npm run es:g2:03`).
