# Addis Eats - Food Ordering Web Application

A single-page, data-driven food ordering application built as the Module 2 capstone project for the CodeOps Full Stack Software Development program at IBT College Canada.

## Features
- **Semantic & Responsive Layout:** Built using modern HTML5 semantic elements (`header`, `main`, `section`, `aside`, `footer`) and styled using CSS Grid/Flexbox to support devices ranging from 360px mobile screens to wide desktop displays.
- **Data-Driven Menu & Live Search:** Dispatches an asynchronous `fetch()` request to load local JSON data (`data/menu.json`), driving real-time reactive search filtering directly from central state.
- **Interactive Cart & Live Totals:** Allows users to add dishes, manage item quantities, and delete rows with mutations processed via higher-order array functions (`find`, `filter`, `reduce`).
- **Validated TeleBirr Checkout:** Implements client-side regular expression validation (`/^(?:\+251|0)9\d{8}$/`) to ensure correct Ethiopian mobile phone formatting before completing orders.
- **State Persistence:** Preserves active shopping cart data across browser reloads using client-side `localStorage`.

## Technologies Used
- **HTML5** (Semantic structure, accessibility `aria` attributes)
- **CSS3** (Custom properties, CSS Grid auto-fill layouts, responsive media queries)
- **JavaScript (ES6+)** (Async/await, Fetch API, closures, high-order array methods, modules, DOM event delegation)

## How to Run Locally
1. Clone or download the repository.
2. Serve the folder via a local development server (such as Live Server in VS Code or `npx serve .`) to support local asynchronous `fetch()` data loading.
3. Open `index.html` in your browser.