# EcoTrack Serverless Backend (Netlify-style)
This folder contains simple serverless functions for `EcoTrack` intended for local testing or lightweight deployment (Netlify/Vercel). These functions use a local `.data/` folder to persist small amounts of state for development. **Serverless environments are ephemeral**; for production you should use a dedicated database (FaunaDB, Firestore, Supabase, DynamoDB, etc.).
Functions:
- `getProfile` - GET: returns basic profile with points and plant records
- `addPoints` - POST: body `{ points: <number> }` adds points to user balance
- `plantTree` - POST: attempts to spend 1000 points to plant a tree; returns error if insufficient
- `getPlants` - GET: returns array of planted tree records
New function:
- `chatbot` - POST: body `{ message: '<user message>' }` forwards to Google Generative Language / Gemini when `GOOGLE_API_KEY` is set in the function environment. If `GOOGLE_API_KEY` is not set the function returns a demo reply.

Local development (Windows PowerShell):
1. Install dependencies:

```powershell
npm install
npm install --save-dev netlify-cli
```

2. Run Netlify dev server (serves functions at `/.netlify/functions/<name>`):

```powershell
npx netlify dev
```

3. Example requests:

```powershell

curl http://localhost:8888/.netlify/functions/getProfile
curl -X POST http://localhost:8888/.netlify/functions/addPoints -H "Content-Type: application/json" -d '{"points":200}'
curl -X POST http://localhost:8888/.netlify/functions/plantTree
curl http://localhost:8888/.netlify/functions/getPlants
```

Notes:
 - The `.data/` folder is created automatically on first write. In CI/serverless deployments this folder is ephemeral.
 - For multi-user support, add user identifiers and secure authentication. Right now these functions implement a single demo user for local testing.
 - To deploy to Netlify, push this repo and configure Netlify to use the `netlify/functions` folder or point to `netlify.toml` if you add one.

Security & Production:
 - Add authentication (JWT / Netlify Identity) before allowing point modification or planting actions.
 - Use a persistent DB for production.
 - Ensure CORS and rate limiting are configured if public.

## Gemini / Generative Language integration

The `chatbot` function can proxy requests to Google's Generative Language (Gemini) API. To enable it, set the environment variable `GOOGLE_API_KEY` (or `GEN_API_KEY`) in Netlify function settings.

You may also set `GEN_MODEL` or `MODEL_NAME` to change the model used (default `text-bison-001`). Example Netlify environment variables:

 - `GOOGLE_API_KEY` = <your_api_key>
 - `GEN_MODEL` = `gemini-1.0` (or `text-bison-001`)

When deploying to Netlify:
1. Open your site settings -> Build & deploy -> Environment -> Environment variables
2. Add `GOOGLE_API_KEY` with your key

If you don't set the key, the function will return a demo reply so the frontend still works locally.
