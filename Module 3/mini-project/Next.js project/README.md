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