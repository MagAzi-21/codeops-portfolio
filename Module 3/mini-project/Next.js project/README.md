# Addis Eats - Living Project (Day 36 Milestone)

## Route Map & File Tree
- `/` -> `app/page.js` (Home landing screen)
- `/menu` -> `app/menu/page.js` (Catalog listing)
- `/menu/[id]` -> `app/menu/[id]/page.js` (Dynamic dish view reading `params.id`)
- `/cart` -> `app/cart/page.js` (Shopping cart overview)
- `/checkout` -> `app/checkout/page.js` (Interactive client checkout using `useRouter`)
- `app/not-found.js` -> Handles unmatched routes and explicit `notFound()` calls
- `app/menu/loading.js` -> Automated Suspense fallback for the menu segment
- `app/menu/error.js` -> Client error boundary with `reset()` capability

## Colocated Feature Components
- `app/menu/DishList.jsx`, `app/menu/CategoryBar.jsx`, and `app/menu/dishes.js` are colocated inside the feature directory and are non-routable.

## Day 13 / Day 38: Component Boundary Optimization

### First Load JS (/menu)
- **Before (Client-Heavy Tree):** `~94 kB` (Everything beneath `/menu` included in client bundle).
- **After (Server-First Composition):** `~88 kB` (`DishList` and `DishCard` are pure Server Components; client JS is isolated strictly to `AddToCartButton` and `FilterShell`).

## Day 14 / Day 39 Milestone: API Routes & Server Actions

### API Endpoints
- **GET `/api/dishes`**: Returns all dishes as JSON (`200 OK`)
- **GET `/api/dishes/[id]`**: Returns a single dish or uniform error contract (`200 OK` or `404 Not Found`)
- **POST `/api/orders`**: Validates request body with shared schema (`201 Created` or `422 Unprocessable Entity` with `fieldErrors`)

### Server Actions
- `placeOrderAction`: Validates form data server-side and invalidates cache via `revalidatePath`
- `cancelOrderAction`: Enforces session authentication and record ownership (`order.userId === user.id`)

### curl Verification
```bash
# Verify 404 contract
curl -i http://localhost:3000/api/dishes/unknown-id

# Verify 422 validation error shape
curl -i -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"name": "Almaz", "phone": "0912"}'

## Day 15 / Day 40 Milestone: Next.js Foundations Complete

### Six-Step Verification
1. **Production Build (`npm run build`)**: Confirms route markers match intent (`○` Static for `/`, `●` Prerendered for `/menu/[id]`, and `λ` Dynamic for `/checkout` and `/api/orders`)[cite: 8, 10].
2. **First Load JS**: Client JavaScript isolated to leaf buttons (`AddToCartButton`) and wrappers (`FilterShell`, `Providers`)[cite: 9, 10].
3. **curl Contract Verification**:
   ```bash
   curl -i http://localhost:3000/api/dishes/unknown-dish
   curl -i -X POST http://localhost:3000/api/orders -H "Content-Type: application/json" -d '{"name":"Almaz","phone":"0912"}'

   ## Day 16 / Day 41 Milestone: Live Data with SWR

### Features
- Standardized fetcher in `lib/fetcher.js` throwing descriptive errors[cite: 19].
- Live order status screen at `/orders/ord_101` with server-rendered `fallbackData` (zero-spinner first paint) and 5s polling[cite: 18, 19].
- Debounced search box at `/search` keeping previous results visible across page changes (`keepPreviousData: true`)[cite: 18, 19].
- Shareable pagination stored in URL search parameters (`?page=`)[cite: 18, 19].

## Day 17 / Day 42 Milestone: Middleware & Authentication

### Security Implementation
- Edge middleware protecting `/checkout`, `/orders`, and `/kitchen`[cite: 20, 24].
- Flagged cookies with `httpOnly: true`, `secure`, and `sameSite: "lax"`[cite: 22, 26].
- Open redirect protection restricting destination redirects to internal paths[cite: 24, 26].
- Database queries strictly scoped to session user id[cite: 23, 26].
- Role authorization enforcing staff privileges server-side on `/kitchen`[cite: 24, 25].

## Day 18 / Day 43 Milestone: Optimisation & Core Web Vitals

### Performance Implementations
- **`next/image` Integration**: Responsive `sizes`, automated modern format generation (WebP/AVIF), and reserved aspect ratios to eliminate layout shift[cite: 27, 33].
- **LCP Hero Flag**: `priority` attribute placed strictly on the primary landing page hero image[cite: 28, 33].
- **Build-Time Font Optimization**: Google Fonts downloaded and self-hosted locally via `next/font/google`[cite: 28, 33].
- **Lazy Third-Party Scripts**: Deferred non-critical analytics using `next/script` with `strategy="lazyOnload"`[cite: 29, 33].
- **Platform Formatting**: Using native `Intl.NumberFormat("en-ET")` for 0 KB ETB currency display[cite: 29].


## Day 19 / Day 44 Milestone: Metadata, SEO & Social Previews

### Technical Deliverables
- **Metadata Composition**: Title templates (`%s | Addis Eats`) and `metadataBase` configured on the root layout[cite: 34, 35].
- **Dynamic Previews**: Edge-rendered 1200x630 OpenGraph images via `next/og` for global routes and individual dishes.
- **Structured Data**: Injected Schema.org `MenuItem` JSON-LD on all dish detail pages[cite: 36].
- **Discovery**: Dynamic `app/sitemap.js` and `app/robots.js` configured with private route exclusions[cite: 36, 37].

# Addis Eats Day 20 - Next.js Production Capstone (Day 45 Milestone)

A complete, production-grade Next.js application implementing file routing, server components, live client data, 3-tier authentication, Core Web Vitals optimization, and technical SEO discovery[cite: 40].

## Route Architecture
- `/` -> Static landing page with single priority hero[cite: 40, 42]
- `/menu` -> ISR catalog (`revalidate = 3600`) with server-rendered dish lists[cite: 40, 42]
- `/menu/[id]` -> Static dish detail pre-rendered via `generateStaticParams`, dynamic OpenGraph cards, and `MenuItem` JSON-LD[cite: 40, 42]
- `/search` -> Live debounced SWR dish search with `keepPreviousData`[cite: 40, 42]
- `/orders` -> Layer 2 protected order history scoped strictly to the session user[cite: 40, 42]
- `/orders/[id]` -> Server-seeded first paint tracked live via SWR polling[cite: 40, 42]
- `/checkout` -> Protected progressive form running via Server Action[cite: 40, 42]
- `/kitchen` -> Server-enforced staff role display[cite: 40, 42]

## Three-Tier Security Proofs
Run from the browser console[cite: 43]:
1. Calling `cancelOrder("ord_101")` while signed out -> **Refused (401)**[cite: 43]
2. Calling `cancelOrder("ord_103")` as Mike -> **Refused (403: Forbidden)**[cite: 43]
3. Visiting `/signin?next=https://malicious.com` -> **Refused (Sanitized to internal route)**[cite: 43]

## Core Documentation
- `AUTH.md`: Full layer definitions and security attack verification[cite: 42]
- `DATA.md`: Server vs client data fetching matrix and SWR keys[cite: 42]
- `PERF.md`: Core Web Vitals before and after comparison[cite: 42]
- `SEO.md`: Metadata, sitemap, robots, and JSON-LD schema[cite: 40]



## Day 21 / Day 46 Milestone: Data Representation & Analytics

### Features
- **Server Aggregation**: Computed metrics (`byArea`, `byDate`) summarized on the server so only small payloads cross into client chart components[cite: 48, 49, 52].
- **Recharts Integration**:
  - `RevenueBarChart.jsx`: Bar chart with zero-based axis and ETB unit labels[cite: 49, 50, 52].
  - `OrdersLineChart.jsx`: Trend line showing daily order volume[cite: 48, 50].
- **Accessible Dual Representation**: Every chart includes an accessible HTML table underneath for screen readers and copyability[cite: 50, 52].
- **Semantic HTML Table**: Built with `<table>`, `<caption>`, `<thead>`, and right-aligned numbers for easy scanning[cite: 50, 51, 52].
- **URL-Persisted Sorting & Paging**: Direct links (`/orders?sort=total&dir=desc&page=1`) with `aria-sort` indicators[cite: 51, 52].
- **Honest Empty State**: Actionable guidance when no orders exist[cite: 51, 52].


## Day 22 / Day 47 Milestone: Maps, Real-Time & Data Formats

### Features
- **Dynamic Leaflet Map**: Loaded via `next/dynamic` with `ssr: false` and a sized 320px placeholder to eliminate layout shift and prevent window reference build crashes[cite: 53].
- **Map Accessibility**: Plain-text delivery information (customer, neighbourhood, address) rendered alongside the map canvas[cite: 54, 58].
- **Server-Sent Events Stream**: `GET /api/orders/[id]/stream` returning live delivery status updates using strict `data: ...\n\n` framing[cite: 55].
- **EventSource Lifecycle**: Live status stream seeded by the server render, displaying connection state, and closing gracefully upon delivery or component unmount[cite: 55, 58].
- **Shared Formatters (`lib/format.js`)**: Single instances of `Intl.NumberFormat` (ETB) and `Intl.DateTimeFormat` (Africa/Addis_Ababa, UTC+3) avoiding hydration bugs[cite: 56].
- **Quotation-Safe CSV Export**: Client-side CSV download correctly escaping commas, quotes, and newlines with instant memory release via `URL.revokeObjectURL`[cite: 57, 58].

## Day 23 / Day 48 Milestone: Event Handling & Production Hardening

### Hardening Features
- **Semantic HTML Interactions**: Clickable elements use native `<button>` and `<Link>` tags with visible focus rings[cite: 60, 61, 65].
- **Keyboard Navigation**: Dialog modals support keyboard focus traps and close cleanly on `Escape`[cite: 60, 61, 65].
- **Double Submit Defense**: Form action states bind `isPending` to disable checkout buttons during transit[cite: 60, 61, 65].
- **Touch Usability**: All buttons, select menus, and inputs enforce minimum 44x44px touch boundaries[cite: 61, 65].
- **Pre-Flight Validation**: `.env.example` committed and production build verified cleanly[cite: 62, 65].

## Build Verification
```bash
npm run build
npm run start