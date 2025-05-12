// Validate current system file hashes against sacred signatures
const fs = require('fs');
const crypto = require('crypto');
const sacredHashes = {
  'wallet.js': 'HASH_PLACEHOLDER_1',
  'npc/handlers/npcRebellion.js': 'HASH_PLACEHOLDER_2',
  'routes/ledger.js': 'HASH_PLACEHOLDER_3'
};
let alert = false;
Object.entries(sacredHashes).forEach(([file, originalHash]) => {
  try {
    const data = fs.readFileSync(file);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    if (hash !== originalHash) {
      console.warn('Hash mismatch:', file);
      alert = true;
    }
  } catch {}
});
module.exports = alert;
