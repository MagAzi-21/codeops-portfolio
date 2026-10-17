# Day 20 / Day 45: Next.js Advanced Capstone Project

## Overview
A production-ready implementation of Addis Eats featuring full session authentication, 3-layer authorization, debounced SWR searching, seeded polling, Core Web Vitals optimization, and technical SEO discovery[cite: 44].

## Verification Checklist
1. **Three Security Attacks:** Verified against `cancelOrder` server action and open redirect defense[cite: 44, 47].
2. **Zero Spinner First Paint:** Initial order status is rendered by the Server Component and handed to SWR via `fallbackData`[cite: 44, 46, 47].
3. **Debounced Search:** Typing in the search bar issues only 1 request per pause (300ms)[cite: 44, 47].
4. **Core Web Vitals:** Tested via `npm run build` followed by `npm run start` under Slow 4G throttling.
5. **Technical SEO:** Validated `sitemap.xml`, `robots.txt`, OpenGraph dynamic cards, and `Schema.org/MenuItem` JSON-LD[cite: 44, 47].