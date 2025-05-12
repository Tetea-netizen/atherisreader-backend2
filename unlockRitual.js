
// unlockRitual.js - Secure Creator ritual unlock
const { setSystemMode } = require('./systemMode');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'unlock_attempts.log');

module.exports = function performUnlock(req, res) {
  const { ritualKey } = req.body;
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const timestamp = new Date().toISOString();

  if (ritualKey === process.env.CREATOR_RITUAL_KEY) {
    setSystemMode('live');

    if (req.session) {
      req.session.hardcoreUnlockVerified = true;
    }

    const logEntry = `[SUCCESS] ${timestamp} from ${clientIP}\n`;
    fs.appendFileSync(LOG_FILE, logEntry);

    return res.json({ success: true, message: 'The seal is lifted. Aether breathes again.' });
  }

  const failLog = `[FAILURE] ${timestamp} from ${clientIP} - INVALID KEY\n`;
  fs.appendFileSync(LOG_FILE, failLog);

  return res.status(403).json({ error: 'The ritual has failed. The seal holds.' });
};
