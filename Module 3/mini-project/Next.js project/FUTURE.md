# Addis Eats - FUTURE.md (Day 49 Triage & Roadmap)

## MoSCoW Prioritization Summary

### 1. Must (Built & Shipped)
- Full Next.js App Router with Server/Client boundary discipline.
- 3-tier authentication: Edge middleware, page-level session guards, and in-action ownership checks.
- Live order status tracking using both SWR polling and Server-Sent Events (SSE).
- Debounced live dish search (`keepPreviousData: true`).
- Dynamic Leaflet delivery map with OpenStreetMap pins and bounds auto-fit (`ssr: false`).
- Accessible semantic tables with URL-persisted sorting, pagination, and honest empty states.
- Recharts analytics dashboard (revenue by area and order volume over time).
- Production pre-flight hardening: 44px touch targets, visible focus rings, and double-submit prevention.

### 2. Should (Completed for Capstone)
- Dual accessible HTML table representation paired under every SVG chart.
- Quotation-safe client CSV export handling commas, quotes, and newlines with memory cleanup.
- Technical SEO: Edge-generated OpenGraph cards (1200x630), dynamic sitemap.xml, robots.txt, and Schema.org `MenuItem` JSON-LD.

### 3. Could (Deliberately Cut to FUTURE.md)
*Naming what was cut demonstrates engineering judgement rather than oversight:*
- **Dark Mode Theme Toggle:** Excluded to prioritize core accessibility and high-contrast focus rings.
- **WebSocket Bi-Directional Courier Chat:** Cut in favor of lightweight Server-Sent Events (SSE) and SWR polling, which run reliably on serverless edge functions without dedicated persistent socket infrastructure.
- **Multi-Language Switcher (Amharic Ge'ez script toggle):** Architecture prepared via `metadataBase` and `Intl` formatters; full localization dictionary deferred to Module 4.