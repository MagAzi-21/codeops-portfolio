# Addis Eats - Rendering Strategy Documentation (Day 40)

| Route | Strategy | Rationale |
| :--- | :--- | :--- |
| `/` | **Static (SSG)** | Marketing and specials do not change per visitor; prerendered once at build time[cite: 7, 9]. |
| `/menu` | **ISR (`revalidate = 3600`)** | Dishes change periodically; served instantly from cache and revalidated at most once an hour[cite: 7, 9]. |
| `/menu/[id]` | **Static (`generateStaticParams`)** | Slugs are known at build time; individual HTML pages prerendered ahead of time[cite: 7, 9, 10]. |
| `/cart` | **CSR** | Private to one tab; rendered on client managing browser storage and running ETB total[cite: 7, 9]. |
| `/checkout` | **Dynamic (SSR)** | Session validation and form mutations executed per-request on the server via Server Actions[cite: 7, 9]. |