# AGENTS.md

Architecture notes for anyone (human or AI) picking up this codebase.

## What this is

Future Places MVP — a Tanzania-first local business discovery app. This is intentionally scoped to *only*
Future Places; the schema and folder layout are designed so a future Future Kilimo / Future Education /
Future Marketplace product can plug into the same `users`, `categories`, and `locations` tables instead of
duplicating them.

## Directory layout

```
db/                      Drizzle schema + client (shared by all Netlify Functions)
  schema.ts               Source of truth for every table
  index.ts                Drizzle client (netlify-db adapter, auto-configured)

netlify/
  functions/              API endpoints (Netlify Functions, TypeScript)
    categories.mts         GET /api/categories
    businesses.mts         GET/POST /api/businesses (list+filter, create as "pending")
    business-detail.mts    GET /api/businesses/:slug (full profile incl. images/hours/services/reviews)
  database/migrations/     SQL migrations, generated via drizzle-kit, applied automatically by Netlify

src/
  components/             Presentational + stateful UI pieces, one CSS file per component
  pages/                  Route-level screens (Home, Explore, PlaceDetailsPage, Saved, AddBusiness,
                          BusinessDashboard)
  data/                   Static config (categories.js) and MOCK data (mockPlaces.js) — mock data is only
                          an offline fallback in lib/database.js, never the primary source
  services/               Browser/platform integrations: locationService.js (Geolocation API, haversine
                          distance), mapService.js (Google Maps directions URL builder, OSM embed URL —
                          swap this file's internals for a real map SDK later)
  lib/                    App-level modules: database.js (API client with mock fallback), auth.js (session
                          shape for customer/business_owner/admin — no real auth flow yet), favorites.js
                          (localStorage now, same call sites will move to /api/favorites once auth exists),
                          hours.js (derives "open now" from business_hours rows)
```

## Data model

`businesses` is the core entity. Every business has a `status` of `pending | verified | rejected |
suspended` — the UI only ever renders "✓ Verified" when `status === "verified"`. New submissions from
`AddBusinessForm` always start `pending` and create a matching `verification_requests` row; there is no
code path that auto-verifies a business.

Related tables (`business_images`, `business_hours`, `business_services`, `reviews`, `favorites`,
`verification_requests`) are separate tables, not JSON blobs on `businesses`, so they can be queried,
joined, and moderated independently (e.g. the admin review UI touches `verification_requests`, not
`businesses` directly).

Demo data (Dar es Salaam, Mwanza, Shinyanga, Dodoma, Arusha businesses) is seeded via
`netlify/database/migrations/20260816152100_seed_demo_data` and flagged `is_mock = true` — treat that flag
as the boundary between real and demo listings if building admin tooling later.

## Auth

No login UI ships in this MVP. `src/lib/auth.js` defines the session shape (`ROLES.CUSTOMER /
BUSINESS_OWNER / ADMIN`) that a real implementation should adopt, so pages don't need to change when auth
lands. Any real role check must happen server-side in the Netlify Function — never trust a client-stored
role for authorization.

## Conventions

- One CSS file per component/page, imported directly (no CSS-in-JS, no Tailwind).
- Swahili strings are used for all user-facing copy (loading/empty/error states, form labels) — the product
  is Tanzania-first, not localized-later.
- `src/lib/database.js` is the only place that calls `/api/*` — pages never `fetch` directly, so swapping
  the backend only touches this file.
