# Habesha Eatery - Responsive Static Site (Week 1 Project)

A production-grade responsive static marketing website for **Habesha Eatery** located in Bole Medhanialem, Addis Ababa.

## How to View
Open `index.html` in any web browser.

## Built Against Day 15 Requirements
1. **Responsive Viewport & Mobile-First Strategy:** Includes `<meta name="viewport">` and structured with baseline mobile styles, enhanced upward using `min-width: 768px` (2 columns) and `min-width: 1024px` (3 columns).
2. **Fluid Typography:** Uses `clamp()` for hero and section headers to ensure responsive scaling across mobile (360px) and wide desktop (1280px+).
3. **Sticky Navigation:** Flexbox-based header pinned to the top of the viewport (`position: sticky; top: 0;`).
4. **Interactive State Animations:** Lightweight GPU-accelerated `translateY` and `scale` transitions (200ms) on cards and buttons.
5. **Reduced Motion Compliance:** Complete `@media (prefers-reduced-motion: reduce)` accessibility fallback block.
6. **Form Validation:** Explicit label associations, numeric limits, and regex pattern verification (`pattern="\+251[0-9]{9}"`).