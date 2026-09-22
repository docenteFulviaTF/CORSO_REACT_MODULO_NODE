// esempi/giorno1/02-primo-script-argv.js
//
// Argomento: primo script Node.js, process.argv, valori di default.
// Esegui con: npm run g1:02
// (equivale a: node esempi/giorno1/02-primo-script-argv.js Fulvia)
//
// Prova anche a lanciarlo direttamente senza argomenti:
//   node esempi/giorno1/02-primo-script-argv.js
// e con un nome diverso:
//   node esempi/giorno1/02-primo-script-argv.js Marco

const nome = process.argv[2] || 'studente';

console.log(process.argv[0]);
console.log(process.argv[1]);
console.log(__filename);
console.log(process.argv.length);
console.log('Ciao ' + nome + '!');

process.argv[1] = 'modifica'; //gli elementi dell'array argv sono in lettura e scrittura
console.log(process.argv[1]);
// A differenza del browser, qui non esiste una pagina HTML: tutto avviene
// nel terminale. Non esistono document, window, alert()...
