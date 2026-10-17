# Day 22 / Day 47 Exercises: Maps, Real-Time & Data Formats

## Implemented Exercises
1. **Dynamic Leaflet Import:** Used `next/dynamic` with `ssr: false` and a sized 320px placeholder to prevent window errors and layout shifts[cite: 57].
2. **Delivery Map:** Placed destination and courier markers with bounds auto-fitting and OpenStreetMap attribution[cite: 58].
3. **Accessible Text Representation:** Delivery addresses and status are provided in plain text alongside the map for screen readers[cite: 58].
4. **Server-Sent Events Route:** Implemented `GET /api/orders/[id]/stream` with strict `data: ...\n\n` framing[cite: 59].
5. **EventSource Lifecycle:** Consumed SSE stream with initial server seeding, state indicator, and cleanup on component unmount[cite: 59].
6. **Centralized Formatters (`lib/format.js`):** Instantiated `Intl.NumberFormat` (ETB) and `Intl.DateTimeFormat` (Africa/Addis_Ababa, UTC+3) once to prevent hydration mismatches[cite: 60].
7. **CSV Escaping Engine:** Client-side CSV generation wrapping fields containing quotes, commas, or newlines in double quotes, with `URL.revokeObjectURL` cleanup.

## Verification
```bash
npm run dev