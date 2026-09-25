// esercizi/giorno4/soluzione/middleware/verificaRuolo.js

function verificaRuolo(ruoloRichiesto) {
    return function (req, res, next) {
        if (!req.utente) {
            return res.status(401).json({ errore: 'Non autenticato' });
        }
        if (req.utente.ruolo !== ruoloRichiesto) {
            return res.status(403).json({ errore: 'Permessi insufficienti' });
        }
        next();
    };
}

module.exports = verificaRuolo;
