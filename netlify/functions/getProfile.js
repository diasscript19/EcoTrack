const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', '.data');
const POINTS_FILE = path.join(DATA_DIR, 'points.json');
const PLANTS_FILE = path.join(DATA_DIR, 'plants.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw || 'null') || fallback;
  } catch (e) {
    return fallback;
  }
}

exports.handler = async function (event) {
  ensureDataDir();
  const pointsObj = readJson(POINTS_FILE, { points: 1500 });
  const plants = readJson(PLANTS_FILE, []);

  const profile = {
    name: 'Alex',
    email: 'alex@ecotrack.com',
    points: pointsObj.points || 0,
    plants: plants,
  };

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(profile),
  };
};