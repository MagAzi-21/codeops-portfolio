# Addis Eats - Rendering Strategy Documentation (Day 40)

| Route | Strategy | Rationale |
| :--- | :--- | :--- |
| `/` | **Static (SSG)** | Marketing content and branding do not change per request; prerendered at build time. |
| `/menu` | **ISR (`revalidate = 3600`)** | Menu updates a few times a day; cached at edge and refreshed in background at most hourly. |
| `/menu/[id]` | **Static (`generateStaticParams`)** | All dish IDs known at build time; static HTML files generated ahead of time. |
| `/cart` | **CSR** | Private to one tab; rendered on client managing browser storage and total state. |
| `/checkout` | **Dynamic (SSR)** | Live session evaluation and mutation handling driven by Server Actions. |