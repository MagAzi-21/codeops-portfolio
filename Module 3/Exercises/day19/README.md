# Day 19 / Day 44: Metadata, Social Previews & Technical SEO

## Implemented Exercises
1. Configured `metadataBase` and title templates in root layout[cite: 38, 39, 42].
2. Assigned distinct, human-readable descriptions and canonical tags to static routes[cite: 38, 41, 42].
3. Implemented dynamic `generateMetadata` for `/menu/[id]`[cite: 38, 42].
4. Created site-wide and per-dish dynamic Open Graph cards at 1200x630 via `next/og` `ImageResponse`[cite: 39, 40, 42].
5. Injected valid `Schema.org/MenuItem` structured data (JSON-LD) with matching ETB prices.
6. Generated dynamic `app/sitemap.js` reflecting all dish routes[cite: 40, 41, 42].
7. Configured `app/robots.js` blocking crawlers from `/cart`, `/checkout`, and `/api/`[cite: 41, 42, 43].

## Verification
```bash
npm run build
npm run start