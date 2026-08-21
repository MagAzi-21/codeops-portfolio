# Habesha Eatery Mini-Site (Day 12)

A two-page semantic and accessible HTML mini-site for a restaurant in Bole, Addis Ababa.

## How to Run
Open `index.html` or `contact.html` directly in any web browser.

## Implemented Accessibility Features
1. **Semantic Landmarks & Headings:** Strict single `<h1>` hierarchy per page with semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
2. **Form Accessibility:** Explicit `<label for="...">` associations for every input and textarea, pre-submit regex patterns (`pattern="\+251[0-9]{9}"`), and `aria-describedby` links for field constraints.
3. **Accessible Tables:** Structured with `<caption>`, `<thead>`, `<tbody>`, and row/column explicit header bindings (`scope="col"`, `scope="row"`).
4. **Media & Embeds:** Explicit `alt` descriptions on all images and a descriptive `title` attribute on all map `<iframe>` tags.
5. **Keyboard Operable:** Full navigation through links, form controls, and submit buttons using Tab and Enter.