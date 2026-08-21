# CBE Dashboard Layout Reconstruction (Day 14)

Reconstructed interface layout for Commercial Bank of Ethiopia (CBE) Online Banking.

## How to Run
Open `index.html` in any web browser.

## Layout Breakdown (Grid vs Flexbox)

1. **CSS Grid Implementation:**
   - **Page Skeleton:** Built using `grid-template-areas` (`"header header"`, `"sidebar main"`, `"footer footer"`) with a dedicated 2-column setup.
   - **Responsive Restacking:** A single `@media (max-width: 700px)` media query collapses the grid areas to a single full-width column (`1fr`).
   - **Self-Responsive Card Grid:** The account cards container uses `repeat(auto-fit, minmax(240px, 1fr))` to reflow dynamically without media queries.

2. **Flexbox Implementation:**
   - **Header & Navbar:** Uses `display: flex` and `justify-content: space-between` for horizontal alignment between logo and action clusters.
   - **Sidebar & Transaction Lists:** Built using `display: flex` and `flex-direction: column`.
   - **Main Toolbar & Transaction Rows:** Flex items distributed across main and cross axes.

3. **Positioning:**
   - **Sticky Element:** Top `.app-header` stays pinned to the top of the viewport during scrolling using `position: sticky; top: 0; z-index: 20;`.
   - **Absolute Anchoring:** Status tags (`.card-badge`) use `position: absolute` pinned to the top-right of their `.stat-card` parent (`position: relative`).