# Rendering Strategy Documentation (Day 37 Exercises)

| Route | Strategy | Rationale |
| :--- | :--- | :--- |
| `/` | **Static (SSG)** | Marketing content never changes between builds; prerendered at build time[cite: 12, 14]. |
| `/menu` | **ISR (`revalidate = 3600`)** | Menu data updates occasionally; cached at edge and rebuilt in background at most hourly[cite: 12, 13, 14]. |
| `/menu/[id]` | **Static (`generateStaticParams`)** | All dish IDs known at build time; prerenders static HTML files for all items[cite: 14, 16]. |
| `/cart` | **CSR** | Interactive client component managing user cart data in browser memory[cite: 12, 14]. |
| `/checkout` | **Dynamic (SSR)** | Reads `cookies()` per-request on the server to authenticate session tokens[cite: 13, 14, 16]. |