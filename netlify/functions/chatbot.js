// functions/chatbot.js
exports.handler = async function(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, headers: { 'Access-Control-Allow-Origin': '*' }, body: 'Method Not Allowed' };
    }

    const body = JSON.parse(event.body || '{}');
    const message = body.message || '';
    const model = process.env.GEN_MODEL || 'gemini-1.5-flash';
    const apiKey = process.env.GOOGLE_API_KEY;

    console.log("API Key:", apiKey ? "Есть" : "Нет");
    console.log("Сообщение пользователя:", message);

    if (!apiKey) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ reply: "Demo mode: No GOOGLE_API_KEY configured.", source: 'demo' })
      };
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;
    const payload = { contents: [ { role: "user", parts: [{ text: message }] } ] };

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    console.log("Ответ Gemini:", JSON.stringify(data));

    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Нет ответа от Gemini.";

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ reply: replyText, source: 'gemini' })
    };

  } catch (err) {
    return { statusCode: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: String(err) }) };
  }
};