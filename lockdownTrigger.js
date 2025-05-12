// If system compromised, lock finance systems and notify Creator
const fs = require('fs');
module.exports = function invokeLockdown() {
  fs.writeFileSync('./lockdown.state', 'LOCKED');
  console.log('AETHERLOCK TRIGGERED - Finance shutdown');
};
