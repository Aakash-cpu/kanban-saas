# Kanban SaaS — Day 1 (MERN + TS)

Production-style starter for a Kanban app built with **MongoDB + Express + React + Node**, all in TypeScript, with JWT auth, Socket.IO realtime refresh, Docker, and a seeded demo.

## Features (Day 1)
- Auth (register/login) with JWT (Bearer)
- Boards → Lists → Cards (drag & drop between lists)
- REST API with Zod validation
- Realtime refresh via Socket.IO
- Docker Compose for API, Web, Mongo
- Vite React app with react-beautiful-dnd
- Seed script with demo data
- GitHub Actions CI (install + build)

## Quick Start (Local)
```bash
# 1) Copy env
cp api/.env.example api/.env

# 2) Start everything
docker compose up -d --build

# 3) Seed demo data
docker compose exec api npm run seed
# Demo account: demo@example.com / password123

# 4) Open web
# http://localhost:5173  (API runs on :4000)
```

## API base
- `GET /api/health`
- `POST /api/auth/register` `{ name, email, password }`
- `POST /api/auth/login` `{ email, password }` → `{ token, user }`
- `GET /api/boards`
- `POST /api/boards` `{ title }`
- `GET /api/boards/:id`
- `POST /api/lists` `{ boardId, title, order? }`
- `POST /api/cards` `{ listId, title, order? }`
- `PATCH /api/cards/move` `{ cardId, toListId, toOrder }`

## ENV
`api/.env`:
```
MONGO_URI=mongodb://mongo:27017/kanban
JWT_SECRET=supersecret
CLIENT_URL=http://localhost:5173
PORT=4000
```

## Deploy (one-liners)
- **API**: Railway/Render → Node 20, set env, `npm ci && npm run build && npm start`
- **Web**: Vercel/Netlify → `VITE_API_URL` = `https://<api-host>/api`

## Roadmap (next)
- Org & RBAC, audit log, comments UI
- Stripe Pro tier, webhooks
- Tests (unit/e2e), OpenAPI docs
