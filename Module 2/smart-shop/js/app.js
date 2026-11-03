/**
 * ==============================================================================
 * Smart Shop (Product Explorer) - Core Application Logic
 * Module 2 Final Exam Implementation
 * ==============================================================================
 */

// --- 1. Centralized Application State (Exact Exam Specification) ---
const state = {
  products: [],
  wishlist: [],
  search: ""
};

// Auxiliary UI tracking & Configuration
const API_URL = "https://dummyjson.com/products";
const STORAGE_KEY = "smart_shop_wishlist";

let isLoading = false;
let currentError = null;

// --- 2. DOM Elements Cache ---
const DOM = {
  productGrid: document.getElementById("product-grid"),
  feedbackContainer: document.getElementById("feedback-container"),
  searchInput: document.getElementById("search-input"),
  clearSearchBtn: document.getElementById("clear-search-btn"),
  resultsStats: document.getElementById("results-stats"),
  
  // Wishlist Navbar Button
  wishlistToggleBtn: document.getElementById("wishlist-toggle-btn"),
  wishlistCountBadge: document.getElementById("wishlist-count-badge"),
  
  // Wishlist Drawer & Overlay
  wishlistDrawer: document.getElementById("wishlist-drawer"),
  drawerOverlay: document.getElementById("drawer-overlay"),
  drawerCloseBtn: document.getElementById("drawer-close-btn"),
  wishlistItemsList: document.getElementById("wishlist-items-list"),
  drawerCountPill: document.getElementById("drawer-count-pill"),
  drawerTotalCount: document.getElementById("drawer-total-count"),
  clearWishlistBtn: document.getElementById("clear-wishlist-btn"),
  
  // Toast container
  toastContainer: document.getElementById("toast-container")
};

// --- 3. Wishlist Storage & Synchronization Helpers ---

/**
 * Hydrates state.wishlist from localStorage.
 */
function loadWishlistFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        state.wishlist = parsed;
      }
    }
  } catch (err) {
    console.warn("Could not parse wishlist from localStorage:", err);
    state.wishlist = [];
  }
  updateWishlistUI();
}

/**
 * Persists state.wishlist to localStorage and synchronizes all UI elements.
 */
function syncWishlistStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.wishlist));
  } catch (err) {
    console.error("Failed to save wishlist to localStorage:", err);
  }
  updateWishlistUI();
}

/**
 * Checks whether a product exists in state.wishlist.
 * @param {number} productId
 * @returns {boolean}
 */
function isProductInWishlist(productId) {
  return state.wishlist.some(item => Number(item.id) === Number(productId));
}

/**
 * Toggles a product in or out of the wishlist.
 * @param {Object} product
 */
function toggleWishlist(product) {
  const index = state.wishlist.findIndex(item => Number(item.id) === Number(product.id));

  if (index > -1) {
    // Remove item
    state.wishlist.splice(index, 1);
    showToast(`Removed "${product.title}" from your wishlist`, "remove");
  } else {
    // Add item (store complete presentation object)
    state.wishlist.push({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      category: product.category,
      rating: product.rating
    });
    showToast(`Added "${product.title}" to your wishlist ❤️`, "success");
  }

  syncWishlistStorage();
  renderProducts(); // Re-render to update card button states
}

/**
 * Removes a specific product from wishlist by ID.
 * @param {number} productId
 */
function removeFromWishlist(productId) {
  const target = state.wishlist.find(item => Number(item.id) === Number(productId));
  const title = target ? target.title : "Product";
  
  state.wishlist = state.wishlist.filter(item => Number(item.id) !== Number(productId));
  syncWishlistStorage();
  renderProducts();
  showToast(`Removed "${title}" from wishlist`, "remove");
}

/**
 * Empties the entire wishlist.
 */
function clearAllWishlist() {
  if (state.wishlist.length === 0) return;
  
  const count = state.wishlist.length;
  state.wishlist = [];
  syncWishlistStorage();
  renderProducts();
  showToast(`Cleared ${count} items from your wishlist`, "remove");
}

// --- 4. API Ingestion & Lifecycle ---

/**
 * Fetches products from DummyJSON API.
 */
async function fetchProducts() {
  isLoading = true;
  currentError = null;
  renderStatus();

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.products)) {
      throw new Error("Invalid response format from DummyJSON API.");
    }

    state.products = data.products;
    isLoading = false;
    currentError = null;
  } catch (error) {
    console.error("Error fetching products:", error);
    isLoading = false;
    currentError = error.message || "Failed to connect to the product service. Please verify your connection.";
  } finally {
    renderStatus();
    renderProducts();
  }
}

// --- 5. Rendering Functions ---

/**
 * Renders loading skeleton or error banner in feedbackContainer.
 */
function renderStatus() {
  DOM.feedbackContainer.innerHTML = "";

  // 1. Loading State: Render Skeleton Cards
  if (isLoading) {
    DOM.productGrid.innerHTML = "";
    DOM.resultsStats.textContent = "Loading catalog...";
    
    const skeletonHTML = Array.from({ length: 8 })
      .map(
        () => `
        <article class="skeleton-card" aria-hidden="true">
          <div class="skeleton-img"></div>
          <div class="skeleton-body">
            <div class="skeleton-pill"></div>
            <div class="skeleton-title"></div>
            <div class="skeleton-price"></div>
            <div class="skeleton-btn"></div>
          </div>
        </article>
      `
      )
      .join("");

    DOM.productGrid.innerHTML = skeletonHTML;
    return;
  }

  // 2. Error State: Render Error Banner with Retry Button
  if (currentError) {
    DOM.productGrid.innerHTML = "";
    DOM.resultsStats.textContent = "";
    
    DOM.feedbackContainer.innerHTML = `
      <div class="error-banner" role="alert">
        <span class="error-icon" aria-hidden="true">⚠️</span>
        <h2 class="error-title">Unable to Load Products</h2>
        <p class="error-message">${escapeHTML(currentError)}</p>
        <button id="btn-retry" class="btn-retry" type="button">
          <span>🔄</span> Try Again
        </button>
      </div>
    `;

    const retryBtn = document.getElementById("btn-retry");
    if (retryBtn) {
      retryBtn.addEventListener("click", () => fetchProducts());
    }
  }
}

/**
 * Filters and renders products matching current search query.
 */
function renderProducts() {
  if (isLoading || currentError) return;

  const query = state.search.trim().toLowerCase();
  const filtered = state.products.filter(p =>
    p.title.toLowerCase().includes(query)
  );

  // Update Stats Counter
  DOM.resultsStats.textContent = `Showing ${filtered.length} of ${state.products.length} products`;

  // 3. Empty Search State: When query returns no items
  if (filtered.length === 0) {
    DOM.productGrid.innerHTML = "";
    DOM.feedbackContainer.innerHTML = `
      <div class="empty-state" role="status">
        <span class="empty-icon" aria-hidden="true">🔍</span>
        <h2 class="empty-title">No products found</h2>
        <p class="empty-desc">
          No products match your search for <span class="empty-query">"${escapeHTML(state.search)}"</span>.
          Please try another keyword or clear the search.
        </p>
        <button id="btn-reset-search" class="btn-reset-search" type="button">
          Clear Search Filter
        </button>
      </div>
    `;

    const resetBtn = document.getElementById("btn-reset-search");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state.search = "";
        DOM.searchInput.value = "";
        DOM.clearSearchBtn.hidden = true;
        DOM.feedbackContainer.innerHTML = "";
        renderProducts();
        DOM.searchInput.focus();
      });
    }
    return;
  }

  // Clear feedback container if results exist
  DOM.feedbackContainer.innerHTML = "";

  // Render Product Cards Grid
  DOM.productGrid.innerHTML = filtered
    .map(product => {
      const inWishlist = isProductInWishlist(product.id);
      const formattedPrice = typeof product.price === "number" ? product.price.toFixed(2) : product.price;
      const formattedRating = typeof product.rating === "number" ? product.rating.toFixed(1) : product.rating;

      return `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-thumbnail-wrapper">
          <div class="card-badges">
            <span class="category-chip">${escapeHTML(product.category || "General")}</span>
            <span class="rating-badge" title="Customer Rating">★ ${formattedRating}</span>
          </div>
          <img 
            src="${escapeHTML(product.thumbnail)}" 
            alt="${escapeHTML(product.title)}" 
            class="product-thumbnail" 
            loading="lazy"
            onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200?text=Product+Image';"
          />
        </div>

        <div class="product-content">
          <h2 class="product-title" title="${escapeHTML(product.title)}">${escapeHTML(product.title)}</h2>
          
          <div class="product-price-row">
            <span class="product-price">$${formattedPrice}</span>
            <span class="product-stock">${product.stock ? `${product.stock} in stock` : "Available"}</span>
          </div>

          <button 
            type="button" 
            class="btn-wishlist-card ${inWishlist ? "in-wishlist" : ""}" 
            data-action="toggle-wishlist"
            data-product-id="${product.id}"
            aria-pressed="${inWishlist}"
            aria-label="${inWishlist ? "Remove " + escapeHTML(product.title) + " from wishlist" : "Add " + escapeHTML(product.title) + " to wishlist"}"
          >
            <span>${inWishlist ? "❤️" : "🤍"}</span>
            <span>${inWishlist ? "In Wishlist" : "Add to Wishlist"}</span>
          </button>
        </div>
      </article>
    `;
    })
    .join("");
}

/**
 * Updates all wishlist-related counters, badges, and drawer list items.
 */
function updateWishlistUI() {
  const count = state.wishlist.length;

  // Update Navbar Badge
  DOM.wishlistCountBadge.textContent = count;
  DOM.wishlistCountBadge.setAttribute("aria-label", `${count} items in wishlist`);

  // Update Drawer Badges & Total
  DOM.drawerCountPill.textContent = `${count} ${count === 1 ? "item" : "items"}`;
  DOM.drawerTotalCount.textContent = `${count} ${count === 1 ? "item" : "items"}`;

  // Enable/Disable Clear Button
  DOM.clearWishlistBtn.disabled = count === 0;

  // Render Drawer Items List
  if (count === 0) {
    DOM.wishlistItemsList.innerHTML = `
      <li class="drawer-empty">
        <span class="drawer-empty-icon" aria-hidden="true">💔</span>
        <h3 class="drawer-empty-title">Your wishlist is empty</h3>
        <p class="drawer-empty-desc">Explore products and tap "Add to Wishlist" to save your favorite items here.</p>
      </li>
    `;
    return;
  }

  DOM.wishlistItemsList.innerHTML = state.wishlist
    .map(item => {
      const formattedPrice = typeof item.price === "number" ? item.price.toFixed(2) : item.price;
      return `
      <li class="wishlist-item" data-id="${item.id}">
        <img 
          src="${escapeHTML(item.thumbnail)}" 
          alt="${escapeHTML(item.title)}" 
          class="wishlist-item-thumb" 
          loading="lazy"
        />
        <div class="wishlist-item-info">
          <h4 class="wishlist-item-title" title="${escapeHTML(item.title)}">${escapeHTML(item.title)}</h4>
          <span class="wishlist-item-price">$${formattedPrice}</span>
        </div>
        <button 
          type="button" 
          class="btn-remove-wishlist" 
          data-action="remove-wishlist"
          data-product-id="${item.id}"
          title="Remove from wishlist"
          aria-label="Remove ${escapeHTML(item.title)} from wishlist"
        >
          🗑️
        </button>
      </li>
    `;
    })
    .join("");
}

// --- 6. Drawer & Modal Controls ---

function openWishlistDrawer() {
  DOM.wishlistDrawer.classList.add("open");
  DOM.drawerOverlay.classList.add("active");
  DOM.drawerOverlay.hidden = false;
  DOM.wishlistDrawer.setAttribute("aria-hidden", "false");
  DOM.wishlistToggleBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden"; // Prevent body scroll
  DOM.drawerCloseBtn.focus();
}

function closeWishlistDrawer() {
  DOM.wishlistDrawer.classList.remove("open");
  DOM.drawerOverlay.classList.remove("active");
  DOM.wishlistDrawer.setAttribute("aria-hidden", "true");
  DOM.wishlistToggleBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";

  setTimeout(() => {
    DOM.drawerOverlay.hidden = true;
  }, 300);
}

// --- 7. Toast Notification Utility ---

/**
 * Displays a non-intrusive floating notification toast.
 * @param {string} message
 * @param {"success"|"remove"} type
 */
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type === "remove" ? "toast-remove" : "toast-success"}`;
  toast.innerHTML = `<span>${type === "remove" ? "✕" : "✓"}</span> <span>${escapeHTML(message)}</span>`;
  
  DOM.toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/**
 * Escapes unsafe HTML characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHTML(str) {
  if (typeof str !== "string") return String(str || "");
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --- 8. Event Listeners Setup ---

function setupEventListeners() {
  // Real-time Search Input Event
  DOM.searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    DOM.clearSearchBtn.hidden = state.search.trim().length === 0;
    renderProducts();
  });

  // Clear Search Button
  DOM.clearSearchBtn.addEventListener("click", () => {
    state.search = "";
    DOM.searchInput.value = "";
    DOM.clearSearchBtn.hidden = true;
    renderProducts();
    DOM.searchInput.focus();
  });

  // Delegated Click on Product Cards ("Add to Wishlist" / "In Wishlist")
  DOM.productGrid.addEventListener("click", (e) => {
    const btn = e.target.closest('[data-action="toggle-wishlist"]');
    if (!btn) return;

    const productId = Number(btn.getAttribute("data-product-id"));
    const product = state.products.find(p => Number(p.id) === productId);

    if (product) {
      toggleWishlist(product);
    }
  });

  // Delegated Click on Wishlist Drawer ("Remove" button)
  DOM.wishlistItemsList.addEventListener("click", (e) => {
    const btn = e.target.closest('[data-action="remove-wishlist"]');
    if (!btn) return;

    const productId = Number(btn.getAttribute("data-product-id"));
    if (productId) {
      removeFromWishlist(productId);
    }
  });

  // Drawer Open / Close Triggers
  DOM.wishlistToggleBtn.addEventListener("click", openWishlistDrawer);
  DOM.drawerCloseBtn.addEventListener("click", closeWishlistDrawer);
  DOM.drawerOverlay.addEventListener("click", closeWishlistDrawer);

  // Clear All Wishlist Trigger
  DOM.clearWishlistBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your entire wishlist?")) {
      clearAllWishlist();
    }
  });

  // Global Keyboard: Close Drawer with ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && DOM.wishlistDrawer.classList.contains("open")) {
      closeWishlistDrawer();
      DOM.wishlistToggleBtn.focus();
    }
  });
}

// --- 9. App Bootstrapper ---
document.addEventListener("DOMContentLoaded", () => {
  loadWishlistFromStorage();
  setupEventListeners();
  fetchProducts();
});

