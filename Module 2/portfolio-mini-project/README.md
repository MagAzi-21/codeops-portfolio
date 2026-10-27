# Mikiyas Abesha | Developer Portfolio (Module 2 Mini-Project)

A lightweight, accessible personal developer portfolio built with semantic HTML5, responsive CSS3, and modern vanilla JavaScript (ES6+).

---

## Technical Overview

### 1. Semantic HTML5 & Accessibility (WCAG AA)
- Structured using semantic landmark elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Full keyboard operability with clear `:focus-visible` outline indicators.
- Accessible ARIA attributes (`aria-expanded`, `aria-label`, `aria-live`) on interactive controls and dynamic feedback regions.
- Touch targets designed to exceed the minimum 44×44px standard for mobile usability.

### 2. Modern Responsive CSS3
- Custom properties (CSS variables) for design tokens and automated light/dark theme switching.
- Mobile-first layout implemented with CSS Grid and Flexbox without heavy framework dependencies.
- Fluid typography and responsive spacing scaling cleanly across mobile, tablet, and desktop viewports.

### 3. Vanilla JavaScript (ES6+) Features
- **Theme Switcher:** Toggles light/dark appearance and synchronizes preferences via `localStorage`.
- **Dynamic Project Filtering:** Filters portfolio items by category without page refreshes.
- **Client-Side Form Validation:** Enforces required field lengths and valid email syntax via regex, accompanied by accessible inline error messaging.
- **Mobile Drawer Navigation:** Accessible hamburger menu toggle supporting click-away dismissals and keyboard `Escape` key handling.

---

## Local Development & Setup

1. Open your terminal and navigate to the project directory:
   ```bash
   cd ~/Desktop/IBT/codeops/"Module 2"/portfolio-mini-project