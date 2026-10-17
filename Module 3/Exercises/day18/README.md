# Day 18 / Day 43: Optimisation & Environment Configuration

## Implemented Exercises
1. Measured Core Web Vitals baseline (LCP, CLS, INP) on throttled production build[cite: 34, 36].
2. Converted image rendering to `next/image` with explicit aspect ratios, modern format generation, and responsive `sizes`[cite: 31, 36].
3. Applied `priority` attribute to exactly one primary above-the-fold hero image to optimize LCP[cite: 32, 36].
4. Replaced external stylesheet font link with `next/font/google` to eliminate CLS and third-party requests[cite: 32, 36].
5. Deferred third-party analytics scripts using `next/script` with `strategy="lazyOnload"`[cite: 33, 36].
6. Configured multi-environment configuration: committed `.env.example`, protected `.env.local`, and isolated secrets from `NEXT_PUBLIC`[cite: 35, 36].

## Verification
```bash
npm run build
npm run start