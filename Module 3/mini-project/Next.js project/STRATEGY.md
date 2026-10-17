# Addis Eats - Rendering Strategy Documentation

| Route | Strategy | Rationale |
| :--- | :--- | :--- |
| `/` | **Static (SSG)** | Marketing and branding content does not change between deployments; prerendered once at build time. |
| `/menu` | **ISR (`revalidate = 3600`)** | Dishes change periodically; served instantly from cache and revalidated in the background at most hourly. |
| `/menu/[id]` | **Static (`generateStaticParams`)** | All dish slugs are known at build time; Next.js builds individual HTML files for every dish ahead of time. |
| `/cart` | **CSR** | Client-rendered component holding localized user cart state in browser memory. |
| `/checkout` | **Dynamic (SSR)** | Reads `cookies()` on every incoming request to authenticate user session tokens. |