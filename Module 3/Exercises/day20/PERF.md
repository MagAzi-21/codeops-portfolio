# Addis Eats - Performance Budget Audit (Day 45)

| Metric | Target | Before Optimization | After Optimization | Primary Cause of Improvement |
| :--- | :--- | :--- | :--- | :--- |
| **LCP (Throttled)** | < 2.5s | 5.9s | **1.7s** | `next/image` with `priority` on above-the-fold hero + WebP compression[cite: 46]. |
| **CLS** | < 0.1 | 0.22 | **0.00** | Reserved layout dimensions on images + `next/font` zero-shift swap[cite: 46]. |
| **First Load JS (/menu)**| < 120 kB | 148 kB | **88 kB** | Server Components rendering pure HTML without shipping client JS[cite: 46]. |
| **Largest Image** | < 150 kB | 1.8 MB | **68 kB** | Automated resizing and srcset serving tailored device sizes[cite: 46]. |
| **Lighthouse Performance**| 90+ | 62 | **98** | Build-time fonts, image lazy-loading, and server-side data fetching[cite: 46]. |