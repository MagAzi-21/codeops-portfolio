# Smart Shop (Product Explorer) 🛍️

A high-performance, accessible, and responsive client-side web application built with **Vanilla HTML5**, **Modern CSS3**, and **ES6+ JavaScript**.

Developed for the **Module 2 Final Exam**.

---

## 🚀 Live Demo & Deployment
- **Live Production URL**: [https://smart-shop-red-one.vercel.app](https://smart-shop-red-one.vercel.app)
- **Deployment Platform**: Vercel
- **GitHub Repository**: [MagAzi-21/codeops-portfolio](https://github.com/MagAzi-21/codeops-portfolio)
- **API Source**: [DummyJSON Products API](https://dummyjson.com/products)

---

## ✨ Features & Rubric Compliance

| # | Exam Requirement | Implementation Detail |
|---|-------------------|------------------------|
| **1** | **Fetch products on app start** | Async `fetchProducts()` triggered on `DOMContentLoaded` from `https://dummyjson.com/products`. |
| **2** | **Dynamic responsive cards** | CSS Grid with `repeat(auto-fill, minmax(270px, 1fr))` adapting seamlessly to mobile, tablet, and desktop. |
| **3** | **Required card fields** | Thumbnail image, title, category chip, formatted price (`$XX.XX`), and star rating (`★ X.X`). |
| **4** | **Real-time search by title** | Instant case-insensitive substring filter updating as the user types, with clear button and live counter. |
| **5** | **Add to Wishlist button** | Card action toggle button with dynamic state (`Add to Wishlist` vs `❤️ In Wishlist`) and toast feedback. |
| **6** | **localStorage Persistence** | Saved items persist across browser reloads under the key `"smart_shop_wishlist"`. |
| **7** | **Wishlist removal & management** | Slide-over drawer with item deletion, "Clear Wishlist", and live navbar counter badge. |
| **8** | **Loading & error messages** | Shimmer skeleton cards during load; clear error banner with "Try Again" retry button on network failures. |
| **+** | **Empty search message** | Dedicated empty state message displaying `"No products match your search for '{query}'"` with a reset filter button. |

---

## 🏗️ State Architecture

As required by the exam rubric, the application maintains a centralized state object:

```javascript
const state = {
  products: [],
  wishlist: [],
  search: ""
};
```

- `state.products`: Stores the raw array of products ingested from `dummyjson.com/products`.
- `state.wishlist`: Stores saved products, hydrated from and synchronized with `localStorage`.
- `state.search`: Tracks the current real-time search string.

---

## 📂 Project Structure

```text
smart-shop/
├── index.html        # Semantic HTML5 markup, header, grid & wishlist drawer
├── css/
│   └── styles.css    # Obsidian dark theme, responsive grid, drawer & shimmer
├── js/
│   └── app.js        # State machine, API fetch, search filter & wishlist logic
└── README.md         # Documentation & deployment guide
```

---

## 💻 Local Development & Testing

1. Clone or open the repository:
   ```bash
   cd "smart-shop"
   ```

2. Open `index.html` directly in your browser, or start a local dev server:
   ```bash
   # Using VS Code Live Server OR Python:
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`.

---

## 🚢 Quick Deployment to Vercel or Netlify

### Option A: Netlify Drop (Instant 30 Seconds, No CLI required)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `smart-shop` folder into the dropzone.
3. Your live URL will be ready immediately!

### Option B: Push to GitHub & Deploy to Vercel
```bash
git add .
git commit -m "feat: complete Smart Shop product explorer for Module 2 Final Exam"
git push origin main
```
1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your GitHub repository.
3. Keep default settings and click **Deploy**.

