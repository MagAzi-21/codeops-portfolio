# Day 12 / Day 37 Exercises: Layouts & Rendering Strategies

### Completed Exercises:
1. Built root layout with header, footer, and `globals.css` owning `<html>` and `<body>`[cite: 16].
2. Created nested `app/menu/layout.js` with category sidebar[cite: 16].
3. Added a state counter inside `menu/layout.js` to prove state persists across navigation[cite: 16].
4. Configured `revalidate = 3600` on `/menu` (verified static ISR build marker)[cite: 13, 14, 16].
5. Implemented `generateStaticParams` on `/menu/[id]` to pre-build static dish pages[cite: 14, 16].
6. Added `cookies()` read on `/checkout` to force dynamic SSR rendering[cite: 13, 16].
7. Wrapped dish list in React `Suspense` for streaming[cite: 15, 16].