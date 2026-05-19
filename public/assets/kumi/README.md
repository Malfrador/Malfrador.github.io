# kumi.run

Event-driven cinema/event scheduling SaaS. Events in -> staffing needs derived -> optimized shifts out.

See [`concept.md`](./concept.md) for the product vision, domain model, and roadmap.

## Stack

- **Backend:** Hono on Bun + Drizzle ORM + better-auth + PostgreSQL
- **Frontend:** React + Vite + Tailwind + shadcn/ui + TanStack Router/Query
- **Solver:** FastAPI + OR-Tools (Python), stubbed for now

## Repo layout

```
apps/
  api/      Hono + Bun API (port 3000)
  web/      React + Vite frontend (port 5173)
  solver/   FastAPI + OR-Tools sidecar (port 8000, optional in dev)
packages/
  db/       Drizzle schema + migrations + seed
  shared/   Zod schemas + types shared between api and web
scripts/
  create-db.ts   One-shot: CREATE DATABASE "kumi"
```

## Prerequisites

- **Bun** ≥ 1.2 — `winget install Oven-sh.Bun`
- **PostgreSQL** 15+ running locally on `5432`. Either:
  - a native install (`winget install PostgreSQL.PostgreSQL.17`), **or**
  - `docker compose up -d postgres` using the provided `docker-compose.yml`
- (Optional) **Docker Desktop** for the solver sidecar container. Not needed
  until you want to exercise the `/api/health/solver` endpoint.

## First-time setup

Assuming native Postgres 17 is already installed and running:

```bash
# 1. deps
bun install

# 2. create a .env from the template, fill in your postgres password
cp .env.example .env
# Then edit DATABASE_URL in .env to include your actual postgres password.

# 3. create the `kumi` database (one-time)
#    Use your postgres admin password here:
$env:POSTGRES_ADMIN_URL = "postgres://postgres:YOUR_PASSWORD@localhost:5432/postgres"
bun run db:create

# 4. apply migrations
bun run db:migrate

# 5. seed demo data
bun run db:seed
#  -> sign-in: demo@kumi.run / password
#  -> operator: operator@kumi.run / password
#  → includes a "Demo Cinema" organization with one venue and three screens
```

## Daily dev

```bash
bun run dev          # api :3000 + web :5173
```

Open http://localhost:5173.

## Scripts

| Command | What it does |
|---|---|
| `bun run dev` | API + Web in parallel |
| `bun run dev:api` | API only |
| `bun run dev:web` | Web only |
| `bun run db:create` | Create the `kumi` database (needs POSTGRES_ADMIN_URL) |
| `bun run db:generate` | Generate a migration from schema changes |
| `bun run db:migrate` | Apply migrations |
| `bun run db:seed` | Seed demo data |
| `bun run db:studio` | Drizzle Studio schema browser |
| `bun run docker:up` | Start Postgres + solver containers (alternative to native) |
| `bun run docker:down` | Stop them |
| `bun run typecheck` | Typecheck all workspaces |
| `bun run lint` / `bun run format` | Biome |

## Deploy (Docker / Coolify)

The repo root [`Dockerfile`](./Dockerfile) builds the Vite app and runs a single Bun process: Hono serves `/api/*` (including `/api/auth/*`) and static files from `apps/web/dist`, with an SPA fallback for client routes. On container start, [`scripts/docker-entrypoint.sh`](./scripts/docker-entrypoint.sh) runs Drizzle migrations from `packages/db`, then starts the API.

Build locally:

```bash
docker build -t kumi .
```

**Coolify (summary):** Create a PostgreSQL database resource, then an application from this repo using **Dockerfile** at the repo root, port **3000**, health check **GET** `http://127.0.0.1:3000/api/health`. Set environment variables (see [`.env.example`](./.env.example)): `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (apex, e.g. `https://kumi.run`), `TRUSTED_ORIGINS` (include apex and `https://*.kumi.run` for subdomains), and `COOKIE_DOMAIN` (e.g. `kumi.run`, no leading dot). Attach the apex domain in Coolify; for every venue subdomain, add Traefik rules so `*.kumi.run` routes to the same service (Coolify “SaaS” / `HostRegexp` pattern in their wildcard docs). Wildcard TLS for `*.kumi.run` requires Traefik **DNS-01** (e.g. Cloudflare API token on the server proxy), not HTTP-01 alone.

**Cloudflare DNS:** `A`/`AAAA` for `@` (apex) and `*` pointing to your server IP. If Traefik uses Let’s Encrypt HTTP-01, proxy status is often **DNS only** (grey cloud) so port 80 reaches the host; with DNS-01 + a provider token, proxied (orange cloud) is commonly used.

**Solver:** optional second service on the same Docker network; set `SOLVER_URL` to its internal base URL (for example `http://solver:8000`).

## Production Subdomain Setup

kumi.run is designed for:
- `kumi.run` -> public landing + signup flow
- `*.kumi.run` -> authenticated app (venue-specific subdomains)

Minimum DNS/hosting requirements:
- Create an `A`/`AAAA` record for `kumi.run` to your frontend/reverse-proxy host.
- Create a wildcard `A`/`AAAA` record for `*.kumi.run` to the same host.
- Provision a wildcard TLS certificate for `*.kumi.run` (and cert for apex/root).
- Configure reverse proxy routing:
  - root host serves landing app
  - wildcard hosts serve the kumi.run app
  - API must be reachable from both root and wildcard hosts (same-origin or configured `VITE_API_URL`).

Practical notes:
- Venue slugs are used as subdomain labels (for example `xinedome.kumi.run`).
- In local development, continue using `localhost` or host-file aliases.
- Set `COOKIE_DOMAIN=kumi.run` (no leading dot) in the API environment so better-auth and `active_venue_id` use a shared parent domain across subdomains.
