# Addis Eats - Next.js App Router (Day 36)

## Route Map
- `/` -> `app/page.js`
- `/menu` -> `app/menu/page.js`
- `/menu/[id]` -> `app/menu/[id]/page.js`
- `/cart` -> `app/cart/page.js`
- `/checkout` -> `app/checkout/page.js`
- Catch-All -> `app/not-found.js`
- Reserved Segment UI -> `app/menu/loading.js`, `app/menu/error.js`

## Verification
```bash
npm run build
npm run dev