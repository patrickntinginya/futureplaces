# Future Places

Future Places ("Gundua kilicho karibu nawe") is a Tanzania-first local discovery MVP. It helps people find
restaurants, shops, hotels, pharmacies, agriculture suppliers, service providers, schools, fuel stations, and
other businesses around them — search, filter by category, view a business profile, call or WhatsApp the
owner, and get directions.

It also gives business owners a simple way to list their business, which starts in a "Pending Verification"
state until an admin reviews it.

## Key technologies

- **React 19 + Vite** — single-page app, mobile-first UI
- **React Router** — client-side routing (Home, Explore, Place details, Saved, Add Business, Business dashboard)
- **Netlify Functions** (TypeScript) — the `/api/*` backend
- **Netlify Database (Postgres) + Drizzle ORM** — persistent storage for businesses, categories, reviews,
  favorites, and verification requests
- Browser Geolocation API for "Karibu yangu" (near me) and distance sorting
- A dependency-free 2D map view for Explore, and OpenStreetMap embeds for single-business maps — both are
  isolated behind `src/services/mapService.js` so a real map SDK can be swapped in later without touching
  page code

## Running locally

```bash
npm install
netlify dev
```

`netlify dev` serves the Vite app together with the Netlify Functions and a local Postgres database branch, so
`/api/*` calls work the same way they will in production.

## Project structure

See `AGENTS.md` for the full architecture notes.
