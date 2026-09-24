<h1 align="center">🎵 Song Guesser</h1>

<p align="center">
  <strong>Guess the song from a short audio clip.</strong><br />
  Pick a genre, choose your difficulty, and test how well you know the charts!
</p>

<p align="center">
  <a href="https://song-guesser-liard.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-▶-brightgreen?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="./docs/homepage.png" alt="Song Guesser homepage" width="800" />
</p>

---

## ✨ Features

- **Guess songs** from real Deezer chart previews
- **Adjustable difficulty** - Easy / Medium / Hard
- **Configurable round count** - 5 to 25 rounds
- **Custom-built audio player**
- **Fully responsive design**

## 🛠️ Tech Stack

<p>
  <a href="https://reactjs.org/" target="_blank"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
  <a href="https://vitejs.dev/" target="_blank"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://nodejs.org/" target="_blank"><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /></a>
  <a href="https://expressjs.com/" target="_blank"><img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" /></a>
  <a href="https://vercel.com/" target="_blank"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
  <a href="https://render.com/" target="_blank"><img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" /></a>
  <a href="https://workers.cloudflare.com/" target="_blank"><img src="https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Workers" /></a>
</p>

| Layer | Tech |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Data | Deezer public API |
| Deployment | Vercel (frontend), Render (backend), Cloudflare Workers (proxy) |



## 🏗️ Architecture

The Express backend proxies all Deezer requests (Deezer's API doesn't support CORS, so direct browser calls aren't possible) and builds quiz rounds server-side - shuffling tracks, generating decoy answers, and applying difficulty-based track pools and playback durations. Genre data is cached in-memory for 24 hours since it changes infrequently.

## 🧩 A real challenge I solved

Deezer's API blocks requests from many cloud-hosting IP ranges at the CDN/WAF level (confirmed via the raw 403 response, which revealed an Akamai edge block).

I resolved this by building a lightweight reverse proxy on **Cloudflare Workers** - since Workers execute from a different edge network than my Render backend, requests routed through it reach Deezer successfully. The Worker enforces a path allowlist so it can't be repurposed as an open proxy to arbitrary Deezer endpoints.

## 📝 Notes

- Backend uptime is maintained via a 5-minute UptimeRobot health check, avoiding Render free-tier cold starts.

## 🚀 Running Locally

**Backend**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 📄 License

MIT
