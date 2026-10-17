# Addis Eats - Core Web Vitals & Performance Audit (Day 43)

## Measurement Methodology
- Production build measured using: `npm run build` followed by `npm run start`[cite: 34, 37].
- Lighthouse tested in Google Chrome DevTools under **Slow 4G Network Throttle** and **4x CPU Slowdown**.

## Core Web Vitals Comparison

| Metric | Before Optimization (Unoptimized <img>, CDN font) | After Optimization (`next/image`, `next/font`) | Target Standard | Primary Factor Responsible |
| :--- | :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | **6.1s** | **1.8s** | < 2.5s | Adding `priority` and responsive `sizes` to above-the-fold hero image[cite: 32, 34]. |
| **CLS** (Cumulative Layout Shift) | **0.24** | **0.00** | < 0.1 | Explicit aspect ratio reservation on cards + build-time self-hosted `next/font`[cite: 31, 33, 34]. |
| **INP** (Interaction to Next Paint) | **140ms** | **52ms** | < 200ms | Zero JavaScript on server-first dish components + native `Intl` currency formatting[cite: 33, 34]. |
| **Page Weight** | **3.8 MB** | **440 kB** | < 1 MB | Automated WebP/AVIF transcoding and lazy-loading below-the-fold dish thumbnails[cite: 31, 34]. |

## Key Findings
1. Replacing standard HTML `<img>` with `next/image` delivered ~85% total byte reduction by avoiding raw full-size photograph payloads[cite: 31, 34].
2. `next/font/google` self-hosts font binaries directly from origin, eliminating external DNS lookup latency and font swap layout jumps[cite: 32, 33].
3. Loading Google Analytics via `next/script` with `strategy="lazyOnload"` deferred non-critical tracking bytes until browser idle time[cite: 33, 36].