# Priyadharshini S — MERN Portfolio

```
priyadharshini-portfolio-mern
├── node_modules        (created by npm install)
├── package.json
├── package-lock.json
├── server.js           ← start here: node server.js
├── server
│   └── index.js        (Express API + MongoDB model)
├── public              (pre-built React website served by server.js)
├── client              (optional: React source, only needed to edit the site)
└── .env.example        (copy to .env and add your MongoDB Atlas URI)
```

## Run locally (Windows / Mac / Linux)

1. Install Node.js 18+ from https://nodejs.org
2. Open this folder in VS Code → Terminal → New Terminal
3. Copy `.env.example` to `.env` (same folder as `server.js`) and set:
   ```
   MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
   PowerShell: `Copy-Item .env.example .env`
4. In MongoDB Atlas → Network Access → Add IP Address → Allow access from anywhere (0.0.0.0/0)
5. Run:
   ```
   npm install
   node server.js
   ```
6. When you see `MongoDB connected` and `Server running on http://localhost:5000`, open http://localhost:5000

Contact-form messages are saved in the `messages` collection of the `portfolio` database (Atlas → Browse Collections).

## Edit the website (optional)

All personal content is in `client/src/data/profile.js` (add your GitHub URL / live demo links there).
After editing, rebuild the site into `public/`:
```
npm run build:client
```
For live-reload while editing: run `node server.js` in one terminal and `npm run dev --prefix client` in another, then open http://localhost:5173.

## Deploy on Render (free)

1. Push this folder to a GitHub repository (`.env` and `node_modules` are git-ignored).
2. Render → New → Blueprint → select the repository (uses `render.yaml`).
3. Paste your Atlas connection string when asked for `MONGODB_URI`.

Build command: `npm install` · Start command: `node server.js`

## Read contact messages

```
curl -H "Authorization: Bearer <ADMIN_TOKEN>" https://<your-site>/api/messages
```
Set `ADMIN_TOKEN` in `.env` (Render generates one automatically).
