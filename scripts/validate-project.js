'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'src', 'manifest.json');
const pagePath = path.join(root, 'src', 'pages', 'index', 'index.ux');
const iconPath = path.join(root, 'src', 'common', 'images', 'icon.png');
const failures = [];

function requireCondition(condition, message) {
  if (!condition) failures.push(message);
}

function readText(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (_) {
    failures.push(`Missing required file: ${path.relative(root, file)}`);
    return '';
  }
}

const manifestText = readText(manifestPath);
let manifest = {};
try {
  manifest = JSON.parse(manifestText);
} catch (_) {
  failures.push('src/manifest.json is invalid JSON');
}

const page = readText(pagePath);
requireCondition(fs.existsSync(iconPath), 'Missing application icon');
requireCondition(manifest.package === 'com.nick.bandmemo', 'Unexpected application package');
requireCondition(manifest.config && manifest.config.designWidth === 192, 'Band 9 designWidth must be 192');
requireCondition(manifest.router && manifest.router.entry === 'Index', 'Index must be the entry route');
requireCondition(manifest.router && manifest.router.pages && manifest.router.pages.Index && manifest.router.pages.Index.component === 'index', 'Index route is incomplete');

const featureNames = Array.isArray(manifest.features) ? manifest.features.map(feature => feature && feature.name) : [];
requireCondition(featureNames.length === 1 && featureNames[0] === 'system.storage', 'Only system.storage is permitted');

const forbidden = [
  /@system\.(fetch|request|file|device|geolocation|network)/,
  /\beval\s*\(/,
  /\bFunction\s*\(/,
  /https?:\/\//,
  /private\.pem|certificate\.pem|BEGIN (?:RSA )?PRIVATE KEY/
];
forbidden.forEach(pattern => requireCondition(!pattern.test(page), `Forbidden runtime pattern: ${pattern}`));
requireCondition(page.includes('function safeNotes(raw)'), 'Stored data validation is required');
requireCondition(page.includes('MAX_NOTES = 12'), 'Note count limit is required');
requireCondition(page.includes('MAX_BYTES = 4096'), 'Stored-data size limit is required');
requireCondition(page.includes("this.mode = 'keyboard'"), 'Keyboard mode is required');
requireCondition(page.includes('MAX_TEXT_LENGTH = 24'), 'Keyboard input length limit is required');

if (failures.length) {
  failures.forEach(message => console.error(`ERROR: ${message}`));
  process.exit(1);
}

console.log('Vela Band 9 project validation passed.');
