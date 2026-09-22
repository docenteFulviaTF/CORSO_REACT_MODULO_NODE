// esercizi/giorno1/esercizio-01-soluzione.js
//
// Soluzione dell'esercizio 1: calcolatrice da riga di comando.
// Esegui con: npm run es:g1:01
// (equivale a: node esercizi/giorno1/esercizio-01-soluzione.js 12 30)
//
// Prova anche altre operazioni, per esempio:
//   node esercizi/giorno1/esercizio-01-soluzione.js 12 30 sottrazione
//   node esercizi/giorno1/esercizio-01-soluzione.js 10 0 divisione
//   node esercizi/giorno1/esercizio-01-soluzione.js 10 5 xyz

const [, , primoArg, secondoArg, operazioneArg] = process.argv;

// L'operazione di default, se non specificata, è "somma" (per far funzionare
// lo script npm "es:g1:01" senza dover passare un quarto argomento).
const operazione = operazioneArg || 'somma';

function stampaIstruzioni() {
    console.log('Uso: node calcolatrice.js <numero1> <numero2> <operazione>');
    console.log('Operazioni supportate: somma, sottrazione, moltiplicazione, divisione');
}

// 1. Verifica che i due numeri siano stati passati
if (primoArg === undefined || secondoArg === undefined) {
    console.error('Errore: mancano uno o entrambi i numeri.');
    stampaIstruzioni();
    process.exit(1);
}

// 2. Conversione in numero (gli argomenti da riga di comando sono sempre stringhe)
const numero1 = Number(primoArg);
const numero2 = Number(secondoArg);

if (Number.isNaN(numero1) || Number.isNaN(numero2)) {
    console.error('Errore: i valori forniti non sono numeri validi.');
    stampaIstruzioni();
    process.exit(1);
}

// 3. Calcolo del risultato in base all'operazione richiesta
let risultato;

switch (operazione) {
    case 'somma':
        risultato = numero1 + numero2;
        break;
    case 'sottrazione':
        risultato = numero1 - numero2;
        break;
    case 'moltiplicazione':
        risultato = numero1 * numero2;
        break;
    case 'divisione':
        if (numero2 === 0) {
            console.error('Errore: divisione per zero non consentita.');
            process.exit(1);
        }
        risultato = numero1 / numero2;
        break;
    default:
        console.error(`Errore: operazione "${operazione}" non riconosciuta.`);
        stampaIstruzioni();
        process.exit(1);
}

console.log(`Risultato: ${risultato}`);
