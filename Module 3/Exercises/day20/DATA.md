# Addis Eats - Data Fetching Strategy (Day 45)

| Data / Feature | Fetch Location | SWR Key / Method | Refresh Rule | Justification |
| :--- | :--- | :--- | :--- | :--- |
| **Menu Catalog** | Server Component | Direct data await | `revalidate = 3600` | Public, indexable, cached at edge[cite: 46]. |
| **Dish Detail** | Server Component | `generateStaticParams` | Static HTML | Slugs known at build time[cite: 44]. |
| **Order Status** | Server + Client | `"/api/orders/${id}"` | `refreshInterval: 5000` | Initial paint seeded via `fallbackData` (0 spinner); polled every 5s[cite: 46]. |
| **Dish Search** | Client Component | `debouncedQuery ? url : null` | 300ms debounce | Null key avoids empty requests; debounce eliminates network waterfalls per keystroke[cite: 46]. |
| **Shopping Cart**| Client Store | Local memory | Tab local | Private to browser tab; never leaves client until checkout[cite: 46]. |