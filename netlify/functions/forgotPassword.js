const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const DATA_DIR = path.join(__dirname, '..', '..', '.data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const TOKENS_FILE = path.join(DATA_DIR, 'resetTokens.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJson(file) {
  try {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
  } catch (e) {
    return [];
  }
}

function writeJson(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
}

async function sendMailSMTP(to, subject, text, html) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.FROM_EMAIL || user;

  if (!host || !port || !user || !pass) {
    throw new Error('SMTP not configured');
  }

  const transporter = nodemailer.createTransport({
    host, port: parseInt(port, 10), secure: parseInt(port, 10) === 465, auth: { user, pass }
  });

  const info = await transporter.sendMail({ from, to, subject, text, html });
  return info;
}

exports.handler = async function(event) {
  ensureDataDir();

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const email = (payload.email || '').toLowerCase();
    if (!email) return { statusCode: 400, body: JSON.stringify({ error: 'Email required' }) };

    const users = readJson(USERS_FILE);
    const user = users.find(u => (u.email || '').toLowerCase() === email);
    if (!user) {
      // For privacy, return success but note not found (still 200 in demo)
      return { statusCode: 200, body: JSON.stringify({ success: true, message: 'If an account exists, an email has been sent.' }) };
    }

    // generate token
    const token = crypto.randomBytes(24).toString('hex');
    const expires = Date.now() + 1000 * 60 * 60; // 1 hour

    const tokens = readJson(TOKENS_FILE) || [];
    tokens.push({ token, email, expires });
    writeJson(TOKENS_FILE, tokens);

    const base = process.env.SITE_BASE_URL || 'http://localhost:8888';
    const resetLink = `${base}/reset-password.html?token=${token}`;

    // Try to send via SMTP if configured
    try {
      await sendMailSMTP(email, 'EcoTrack Password Reset', `Reset your password: ${resetLink}`, `<p>Click to reset your password: <a href="${resetLink}">${resetLink}</a></p>`);
      return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Password reset email sent.' }) };
    } catch (err) {
      // SMTP not available — return the reset link in response for demo purposes
      return { statusCode: 200, body: JSON.stringify({ success: true, demoResetLink: resetLink, message: 'SMTP not configured; demo reset link returned.' }) };
    }
  } catch (err) {
    console.error('forgotPassword error', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
