
// integrityCheck.js - Recursive hash validation with external hash list
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE_DIR = path.join(__dirname, '..');
const HASH_DB_PATH = path.join(__dirname, 'expected_hashes.json');

function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

function loadExpectedHashes() {
  try {
    return JSON.parse(fs.readFileSync(HASH_DB_PATH));
  } catch (err) {
    console.error('[IntegrityCheck] Failed to load expected hashes:', err);
    return {};
  }
}

function scanDirectory(dir, expectedHashes, report = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative(BASE_DIR, fullPath);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath, expectedHashes, report);
    } else {
      const currentHash = getFileHash(fullPath);
      const expected = expectedHashes[relativePath];
      if (!expected) {
        report.push({ file: relativePath, status: 'unchecked', hash: currentHash });
      } else if (expected !== currentHash) {
        report.push({ file: relativePath, status: 'tampered', expected, actual: currentHash });
      }
    }
  }
  return report;
}

function runIntegrityCheck() {
  const expectedHashes = loadExpectedHashes();
  const issues = scanDirectory(BASE_DIR, expectedHashes);
  if (issues.length === 0) {
    console.log('[IntegrityCheck] All files verified.');
  } else {
    console.warn('[IntegrityCheck] Issues detected:', issues);
    fs.writeFileSync(path.join(__dirname, 'integrity_report.json'), JSON.stringify(issues, null, 2));
  }
}

runIntegrityCheck();
