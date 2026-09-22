# Esercizio 1 — Calcolatrice da riga di comando

**Argomenti coinvolti:** primo script Node.js, `process.argv`, codice sincrono.

## Obiettivo

Scrivere uno script `calcolatrice.js` che riceva da riga di comando due numeri e
un'operazione, e stampi il risultato.

```bash
node calcolatrice.js 12 30 somma
# Risultato: 42

node calcolatrice.js 12 30 sottrazione
# Risultato: -18

node calcolatrice.js 12 30 moltiplicazione
# Risultato: 360

node calcolatrice.js 12 30 divisione
# Risultato: 0.4
```

## Requisiti

1. I tre argomenti (`primoNumero`, `secondoNumero`, `operazione`) vanno letti da
   `process.argv`.
2. Le operazioni supportate sono: `somma`, `sottrazione`, `moltiplicazione`, `divisione`.
3. Se l'operazione non è una di queste quattro, stampa un messaggio d'errore chiaro
   e termina (`process.exit(1)`) invece di proseguire.
4. Se manca uno dei tre argomenti, stampa le istruzioni d'uso e termina.
5. In caso di divisione per zero, stampa un messaggio d'errore invece di stampare
   `Infinity`.
6. Tutto il codice è **sincrono**: nessuna callback, nessuna Promise, nessun `fs`.

## Suggerimento

Ricorda che gli argomenti passati da riga di comando arrivano sempre come stringhe:
vanno convertiti in numero con `Number(...)` o `parseFloat(...)` prima di fare i calcoli.

La soluzione completa è in `esercizio-01-soluzione.js` (`npm run es:g1:01`).
