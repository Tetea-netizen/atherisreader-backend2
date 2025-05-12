// Validate NPC core file integrity using SHA-256
const fs = require('fs');
const crypto = require('crypto');
const sacredNPC = {
  'npc/handlers/npcRebellion.js': 'HASH_NPC_REBELLION',
  'npc/handlers/npcEmotion.js': 'HASH_NPC_EMOTION'
};
let corrupted = false;
Object.entries(sacredNPC).forEach(([file, refHash]) => {
  try {
    const data = fs.readFileSync(file);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    if (hash !== refHash) corrupted = true;
  } catch {}
});
if (corrupted) fs.writeFileSync('./npc_corruption.flag', 'NPC CODE MODIFIED');
module.exports = corrupted;
