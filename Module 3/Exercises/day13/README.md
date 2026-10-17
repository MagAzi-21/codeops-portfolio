# Day 13 / Day 38: Server & Client Components

## Bundle Measurement Comparison (/menu)

- **Before (Client-Heavy Tree):** First Load JS: `~94 kB`
- **After (Server-First Composition):** First Load JS: `~88 kB` (`DishList` and `DishCard` are pure Server Components; client JS is isolated exclusively to `AddToCartButton` and `FilterShell`).

## How to Run
```bash
npm run build
npm run dev