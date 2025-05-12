
// fileWatchdog.js - Enhanced version
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { setSystemMode } = require('./systemMode');

// Paths to sensitive files relative to base
const SENSITIVE_FILES = ['wallet.js', 'auth.js', 'npc.js'];
const BASE_DIR = path.join(__dirname, '..');
const DEBOUNCE_INTERVAL = 5000;

let lastTriggered = {};

function hashFile(filepath) {
  try {
    const data = fs.readFileSync(filepath);
    return crypto.createHash('sha256').update(data).digest('hex');
  } catch (err) {
    console.error('Hashing error:', err);
    return null;
  }
}

function startWatchdog() {
  for (const file of SENSITIVE_FILES) {
    const fullPath = path.join(BASE_DIR, file);
    try {
      fs.watch(fullPath, (eventType) => {
        const now = Date.now();
        if (lastTriggered[file] && now - lastTriggered[file] < DEBOUNCE_INTERVAL) {
          return;
        }
        lastTriggered[file] = now;

        console.warn(`[SECURITY] Tampering detected in ${file} (${eventType})`);

        const newHash = hashFile(fullPath);
        // Optionally compare against stored hash here
        console.log(`[INFO] New hash for ${file}: ${newHash}`);

        // Trigger lockdown
        setSystemMode('lockdown');

        // Log alert to file
        fs.appendFileSync(
          path.join(BASE_DIR, 'system_alerts.log'),
          `[${new Date().toISOString()}] Tampering detected in ${file}. Hash: ${newHash}\n`
        );
      });
    } catch (err) {
      console.error(`Watchdog failed for ${file}:`, err);
    }
  }
}

startWatchdog();
