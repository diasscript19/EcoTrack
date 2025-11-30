const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', '.data');
const PLANTS_FILE = path.join(DATA_DIR, 'plants.json');

function ensureDataDir() { if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true }); }
function readJson(filePath, fallback) { try { if (!fs.existsSync(filePath)) return fallback; const raw = fs.readFileSync(filePath, 'utf8'); return JSON.parse(raw || 'null') || fallback; } catch (e) { return fallback; } }

exports.handler = async function (event) {
  ensureDataDir();
  const plants = readJson(PLANTS_FILE, []);
  return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(plants) };
};