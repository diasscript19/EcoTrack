const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', '.data');
const POINTS_FILE = path.join(DATA_DIR, 'points.json');
const PLANTS_FILE = path.join(DATA_DIR, 'plants.json');

function ensureDataDir() { if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true }); }
function readJson(filePath, fallback) {
  try { if (!fs.existsSync(filePath)) return fallback; const raw = fs.readFileSync(filePath, 'utf8'); return JSON.parse(raw || 'null') || fallback; } catch (e) { return fallback; }
}
function writeJson(filePath, obj) { fs.writeFileSync(filePath, JSON.stringify(obj, null, 2)); }

exports.handler = async function (event) {
  ensureDataDir();

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { 'Access-Control-Allow-Origin': '*' }, body: 'Method Not Allowed' };
  }

  const pointsObj = readJson(POINTS_FILE, { points: 1500 });
  const plants = readJson(PLANTS_FILE, []);

  const cost = 1000;
  if ((pointsObj.points || 0) < cost) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Not enough points', points: pointsObj.points || 0 }),
    };
  }

  pointsObj.points = Number(pointsObj.points) - cost;
  writeJson(POINTS_FILE, pointsObj);

  const plant = { date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString(), points: cost, type: 'tree' };
  plants.push(plant);
  writeJson(PLANTS_FILE, plants);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ success: true, points: pointsObj.points, plant }),
  };
};