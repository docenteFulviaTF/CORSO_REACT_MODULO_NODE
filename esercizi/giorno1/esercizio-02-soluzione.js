// esercizi/giorno1/esercizio-02-soluzione.js
//
// Soluzione dell'esercizio 2: orologio asincrono.
// Esegui con: npm run es:g1:02
// Lo script impiega circa 3 secondi a completare: è normale, è voluto.

const fs = require('fs');
const path = require('path');

console.log('Avvio orologio...');

setTimeout(function () {
    console.log('Tick 1');
}, 1000);

setTimeout(function () {
    console.log('Tick 2');
}, 2000);

setTimeout(function () {
    // fs.readFile è asincrona: il callback viene eseguito solo quando la
    // lettura è completata, senza bloccare il resto del programma nel frattempo
    fs.readFile(path.join(__dirname, 'messaggio.txt'), 'utf8', function (err, contenuto) {
        if (err) {
            console.error('Errore nella lettura del file:', err.message);
            return;
        }
        console.log('Contenuto del file:', contenuto.trim());
    });
}, 3000);

// Questa riga viene eseguita SUBITO, prima di tutti i timer qui sopra: i tre
// setTimeout si limitano a "programmare" un'operazione futura e restituiscono
// immediatamente il controllo al codice successivo.
console.log('Timer impostati, in attesa...');
