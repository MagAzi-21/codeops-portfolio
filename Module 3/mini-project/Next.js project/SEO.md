# Addis Eats - Search Engine Optimization & Discovery Architecture (Day 44)

## Metadata & Social Preview Configuration

| Page Route | Title Format | Canonical URL | Open Graph Image | Robots Directive |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `Authentic Ethiopian Dishes Delivered Fast \| Addis Eats` | `https://addiseats.et/` | Global `/opengraph-image` (1200x630) | `index, follow` |
| `/menu` | `Menu Catalog \| Addis Eats` | `https://addiseats.et/menu` | Global `/opengraph-image` (1200x630) | `index, follow` |
| `/menu/[id]` | `${dish.name} \| Addis Eats` | `https://addiseats.et/menu/${id}` | Dynamic per-dish ImageResponse | `index, follow` |
| `/cart` | `Shopping Cart \| Addis Eats` | None | None | `noindex, nofollow` |
| `/checkout` | `Checkout \| Addis Eats` | None | None | `noindex, nofollow` |

## Technical Implementation Proofs

1. **`metadataBase` Configuration:** Defined in root layout (`https://addiseats.et`), guaranteeing all `og:image` tags render fully qualified absolute URLs[cite: 34, 35].
2. **Dynamic `MenuItem` JSON-LD:** Structured data is dynamically generated per dish and injected into HTML headers, specifying ETB prices matching the on-screen text[cite: 36].
3. **Automated Dynamic Sitemap:** Generated via `app/sitemap.js`, automatically indexing newly added dishes while omitting private endpoints (`/cart`, `/checkout`, `/orders`).
4. **Crawl Budget Protection:** `app/robots.js` explicitly disallows crawling of `/cart`, `/checkout`, `/orders`, `/kitchen`, and `/api/`.