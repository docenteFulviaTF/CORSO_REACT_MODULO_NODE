// esercizi/giorno4/soluzione/middleware/verificaJWT.js

const jwt = require('jsonwebtoken');

function verificaJWT(req, res, next) {
  console.log('verificaJWT ingresso');
  const authHeader = req.headers['authorization'];
  console.log('verificaJWT authHeader ', authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('prima di generare errore token mancante');
    return res.status(401).json({errore: 'Token mancante'});
  }

  const token = authHeader.split(' ')[1];
  console.log('in verificaJWT token = ' + token);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.utente = payload;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({errore: 'Token scaduto, effettua nuovamente il login'});
    }
    return res.status(401).json({errore: 'Token non valido'});
  }
}

module.exports = verificaJWT;
