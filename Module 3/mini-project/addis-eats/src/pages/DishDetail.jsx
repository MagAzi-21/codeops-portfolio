import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dishes } from "../data/dishes";
import { useCart } from "../context/useCart";

function DishDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [nutritionModalOpen, setNutritionModalOpen] = useState(false);

  // Match by id or by slug
  const dish = dishes.find(
    (d) => String(d.id) === id || d.slug === id || d.name.toLowerCase().replace(/\s+/g, "-") === id
  );

  if (!dish) {
    return (
      <div className="dish-not-found-page container" role="status">
        <div className="empty-results-card">
          <div className="empty-results-icon">🔍</div>
          <h2 className="empty-results-title">Dish Not Found</h2>
          <p className="empty-results-text">
            We couldn't locate a dish corresponding to identifier "{id}". It may have been rotated out of today's specials.
          </p>
          <Link to="/menu" className="btn-primary">
            ← Return to Full Menu
          </Link>
        </div>
      </div>
    );
  }

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addToCart(dish, quantity);
  };

  const currentTotal = dish.price * quantity;

  return (
    <div className="dish-detail-page container">
      {/* Breadcrumb Navigation */}
      <nav className="detail-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/menu">Menu</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{dish.name}</span>
      </nav>

      <div className="dish-detail-grid">
        {/* Left Column: Visual Showcase */}
        <div className="dish-detail-visual">
          <div className="detail-image-card">
            <img
              src={dish.image}
              alt={dish.name}
              className="detail-main-img"
              width="800"
              height="600"
            />
            <div className="detail-badges-overlay">
              {dish.badge && <span className="dish-tag badge-gold">{dish.badge}</span>}
              {dish.spicy ? (
                <span className="dish-tag badge-spicy">🌶️ {dish.spiceLevel}</span>
              ) : (
                <span className="dish-tag badge-mild">🌱 {dish.spiceLevel}</span>
              )}
            </div>
          </div>

          <div className="detail-highlights-strip">
            <div className="highlight-cell">
              <span className="cell-icon">⏱</span>
              <span className="cell-label">Prep Time</span>
              <span className="cell-val">{dish.prepTime}</span>
            </div>
            <div className="highlight-cell">
              <span className="cell-icon">🔥</span>
              <span className="cell-label">Energy</span>
              <span className="cell-val">{dish.calories}</span>
            </div>
            <div className="highlight-cell">
              <span className="cell-icon">★</span>
              <span className="cell-label">Rating</span>
              <span className="cell-val">{dish.rating} ({dish.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Culinary Details & Add To Cart */}
        <div className="dish-detail-info">
          <div className="detail-header">
            <span className="detail-amharic">{dish.amharic}</span>
            <h1 className="detail-title">{dish.name}</h1>
            <p className="detail-portion-info">🍽️ {dish.portion}</p>
          </div>

          <div className="detail-price-box">
            <div className="price-tag-wrap">
              <span className="detail-currency">ETB</span>
              <span className="detail-amount">{dish.price}</span>
            </div>
            <span className="tax-inclusive-note">VAT & packaging included</span>
          </div>

          {/* Description & Story */}
          <div className="detail-story">
            <h3 className="story-heading">Culinary Craft & Flavor Profile</h3>
            <p className="story-text">{dish.longDescription}</p>
          </div>

          {/* Dietary Badges */}
          {dish.dietary && (
            <div className="dietary-tags-list">
              {dish.dietary.map((tag) => (
                <span key={tag} className="dietary-pill">
                  ✓ {tag}
                </span>
              ))}
            </div>
          )}

          {/* Ingredient Breakdown */}
          <div className="ingredients-block">
            <h3 className="ingredients-heading">Ingredients & Spices</h3>
            <ul className="ingredients-list">
              {dish.ingredients.map((item, idx) => (
                <li key={idx} className="ingredient-item">
                  <span className="ingredient-bullet">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Quantity Selector & Add To Cart CTA */}
          <div className="detail-order-action-card">
            <div className="quantity-control-group">
              <label htmlFor="dish-qty" className="quantity-label">
                Quantity:
              </label>
              <div className="quantity-selector">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span id="dish-qty" className="qty-number" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary detail-add-cart-btn"
              onClick={handleAddToCart}
            >
              <span>Add to Cart</span>
              <span className="btn-dot-sep">•</span>
              <span>{currentTotal} ETB</span>
            </button>
          </div>

          {/* Nutrition Information Trigger */}
          <div className="detail-nutrition-bar">
            <button
              type="button"
              className="btn-link-nutrition"
              onClick={() => setNutritionModalOpen(true)}
            >
              📋 View Nutrition & Teff Allergen Details
            </button>
            <Link to="/menu" className="btn-back-menu">
              ← Back to Catalog
            </Link>
          </div>
        </div>
      </div>

      {/* Nutrition & Allergy Modal */}
      {nutritionModalOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setNutritionModalOpen(false)}
        >
          <div
            className="modal-content-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 id="modal-title" className="modal-title">
                {dish.name} — Nutrition & Tradition
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setNutritionModalOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-intro">
                All dishes at Addis Eats are prepared in strict adherence to authentic
                highland traditions, respecting both fasting (Tsom) rules and modern dietary needs.
              </p>
              <div className="modal-specs-table">
                <div className="table-row">
                  <span className="spec-label">Caloric Estimate:</span>
                  <span className="spec-value">{dish.calories} per serving</span>
                </div>
                <div className="table-row">
                  <span className="spec-label">Spice Classification:</span>
                  <span className="spec-value">{dish.spiceLevel}</span>
                </div>
                <div className="table-row">
                  <span className="spec-label">Teff Injera Purity:</span>
                  <span className="spec-value">100% Gluten-free organic highland teff grain</span>
                </div>
                <div className="table-row">
                  <span className="spec-label">Butter / Oil:</span>
                  <span className="spec-value">
                    {dish.category === "Vegan/Fasting"
                      ? "Pure Cold-Pressed Vegetable Oil (Dairy-Free)"
                      : "Artisanal Herbed Niter Kibbeh"}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-primary"
                onClick={() => setNutritionModalOpen(false)}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DishDetail;
