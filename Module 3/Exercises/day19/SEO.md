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

1. **`metadataBase` Verification:** Set to `https://addiseats.et` in root layout, ensuring all OpenGraph preview tags yield fully qualified absolute URLs (`og:image`) when shared on Telegram and WhatsApp[cite: 38, 39, 40].
2. **Dynamic JSON-LD Injection:** Every dish detail route embeds a valid `Schema.org/MenuItem` object carrying matching ETB currency, dish name, and description[cite: 40].
3. **Automated Dynamic Sitemap:** `app/sitemap.js` queries `getDishes()` to render active dish URLs at build time while strictly excluding private routes (`/cart`, `/checkout`).
4. **Crawler Hygiene (`robots.js`):** Restricts web search crawlers from accessing private dynamic routes (`/cart`, `/checkout`, `/orders`, `/api/`) while advertising the canonical `sitemap.xml`.