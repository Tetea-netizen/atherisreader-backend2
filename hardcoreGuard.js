
// hardcoreGuard.js - Middleware to enforce Hardcore Mode unlock
const { getSystemMode } = require('./systemMode');

module.exports = function hardcoreGuard(req, res, next) {
  const mode = getSystemMode();
  const session = req.session || {};

  if (mode === 'hardcore' && !session.hardcoreUnlockVerified) {
    return res.status(403).json({ error: 'Access blocked: Hardcore Mode active. Ritual unlock required.' });
  }

  next();
};
