# Deployment Notes (Frontend + Backend)

## 1) API URL for frontend (required)
Set this environment variable in your frontend hosting dashboard (Render Static Site):

`VITE_SERVER_URL=https://mern-integeration.onrender.com/api`

Do not leave it empty in production.

## 2) SPA route rewrite (fixes `/login` 404)
If you refresh on `/login` or open `/myposts` directly, static hosting must rewrite all paths to `index.html`.

Add this rewrite rule in Render Static Site settings:

- Source: `/*`
- Destination: `/index.html`
- Action: `Rewrite`

## 3) Backend CORS and cookies
Set backend environment variables in Render Web Service:

- `NODE_ENV=production`
- `CORS_ORIGINS=https://mern-integeration-frontend.onrender.com,http://localhost:5173`

This is required for cross-site cookie auth (`withCredentials: true`).
