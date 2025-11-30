const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', '.data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

function ensureDataDir() { if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true }); }
function readJson(filePath, fallback) { try { if (!fs.existsSync(filePath)) return fallback; const raw = fs.readFileSync(filePath, 'utf8'); return JSON.parse(raw || 'null') || fallback; } catch (e) { return fallback; } }

exports.handler = async function(event) {
  ensureDataDir();
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: { 'Access-Control-Allow-Origin': '*' }, body: 'Method Not Allowed' };

  let payload = {};
  try { payload = JSON.parse(event.body || '{}'); } catch(e) { payload = {}; }
  const email = (payload.email || '').trim().toLowerCase();
  const password = (payload.password || '');

  if (!email || !password) {
    return { statusCode: 400, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Email and password required' }) };
  }

  const users = readJson(USERS_FILE, []);
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return { statusCode: 401, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Invalid credentials' }) };
  }

  const token = Buffer.from(user.id).toString('base64');
  return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ success: true, token, user: { id: user.id, name: user.name, email: user.email } }) };
};