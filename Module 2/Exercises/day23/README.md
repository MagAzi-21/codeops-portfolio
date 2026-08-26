# Addis Eats - Capstone Project Core (Day 23)

A single-page, data-driven food ordering application built with vanilla JavaScript, HTML5, and CSS Grid/Flexbox.

## How to Run
Serve the directory via a local development server (such as Live Server in VS Code or `npx serve .` / `python3 -m http.server`) to allow `fetch()` requests to load `data/menu.json`.

## Core Features
1. **Semantic & Responsive Scaffold:** Structured using `<header>`, `<main>`, `<section id="menu">`, `<aside id="cart">`, and `<footer>`. Employs CSS Grid auto-fill for mobile responsiveness, transitioning to a multi-column desktop layout at `>= 800px`.
2. **Central State Loop:** Uses a unified `state` object holding `dishes`, `cart`, and `search`.
3. **Live Search:** Reactive filtering against `state.dishes` with clear empty state feedback.
4. **Interactive Cart:** Add, increment, and remove operations computed via array methods (`find`, `filter`, `reduce`) and persisted to `localStorage`.