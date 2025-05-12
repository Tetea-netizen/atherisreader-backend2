
// npcDefenseTrigger.js - Calls integrityCheck when NPC behavior or platform rules are violated
const { exec } = require('child_process');
const path = require('path');

function alertNPCViolation(reason = 'Unknown anomaly') {
  console.warn(`[NPC ALERT] ${reason}`);
  runIntegrityCheck();
}

function runIntegrityCheck() {
  const integrityScript = path.join(__dirname, 'integrityCheck.js');
  exec(`node "${integrityScript}"`, (err, stdout, stderr) => {
    if (err) {
      console.error('[NPC Defense] Integrity check failed:', stderr);
    } else {
      console.log('[NPC Defense] Integrity scan complete.\n' + stdout);
    }
  });
}

module.exports = alertNPCViolation;
