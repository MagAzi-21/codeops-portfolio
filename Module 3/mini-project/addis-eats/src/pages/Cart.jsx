import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalAmount,
    totalCount,
  } = useCart();

  // Free delivery over 600 ETB, otherwise flat 50 ETB standard fee
  const deliveryFee = totalAmount >= 600 || totalAmount === 0 ? 0 : 50;
  const grandTotal = totalAmount + deliveryFee;

  // Honest empty state
  if (cartItems.length === 0) {
    return (
      <div className="cart-page container">
        <div className="empty-cart-card" role="status">
          <div className="empty-cart-icon-wrap">
            <span className="empty-cart-symbol">🛒</span>
          </div>
          <h1 className="empty-cart-title">Your Order Cart is Empty</h1>
          <p className="empty-cart-subtext">
            You haven't selected any authentic Ethiopian dishes yet.
            Discover our slow-simmered Doro Wat, sizzling Shekla Tibs, or healthy fasting platters.
          </p>
          <div className="empty-cart-actions">
            <Link to="/menu" className="btn-primary">
              Browse Ethiopian Menu Catalog →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      {/* Header */}
      <div className="cart-header-row">
        <div>
          <span className="section-tag">Order Review</span>
          <h1 className="cart-title">Your Addis Eats Selection</h1>
          <p className="cart-subtitle">
            Review your dishes before fast TeleBirr checkout and hot dispatch.
          </p>
        </div>

        <button
          type="button"
          className="btn-clear-cart"
          onClick={() => {
            if (window.confirm("Are you sure you want to clear all items from your cart?")) {
              clearCart();
            }
          }}
          aria-label="Clear all items from your order"
        >
          🗑️ Clear Cart
        </button>
      </div>

      <div className="cart-layout-grid">
        {/* Left Column: Item List */}
        <div className="cart-items-column">
          <ul className="cart-item-list" aria-label="Selected food items">
            {cartItems.map((item) => {
              const itemTotal = item.price * item.quantity;
              return (
                <li key={item.id} className="cart-item-card">
                  <div className="cart-item-thumbnail-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-thumbnail"
                      width="100"
                      height="80"
                    />
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-title-row">
                      <div>
                        {item.amharic && (
                          <span className="cart-item-amharic">{item.amharic}</span>
                        )}
                        <h3 className="cart-item-name">
                          <Link to={`/dish/${item.id}`}>{item.name}</Link>
                        </h3>
                      </div>
                      <button
                        type="button"
                        className="btn-item-remove"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        ✕
                      </button>
                    </div>

                    <div className="cart-item-meta">
                      <span className="cart-item-unit-price">
                        {item.price} ETB each
                      </span>
                      {item.spicy && (
                        <span className="cart-item-badge-spicy">🌶️ Berbere</span>
                      )}
                    </div>

                    <div className="cart-item-bottom-row">
                      {/* Quantity Controls */}
                      <div className="cart-qty-controls" aria-label="Quantity controls">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="cart-qty-val" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="cart-line-total">
                        <span className="line-total-currency">ETB</span>
                        <span className="line-total-amount">{itemTotal}</span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="cart-continue-shopping">
            <Link to="/menu" className="link-back-menu">
              ← Add more dishes from menu
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <aside className="cart-summary-column" aria-label="Order Financial Summary">
          <div className="summary-sticky-card">
            <h2 className="summary-card-title">Order Summary</h2>

            <div className="summary-rows">
              <div className="summary-row">
                <span className="summary-label">Items Count:</span>
                <span className="summary-val">{totalCount} {totalCount === 1 ? "dish" : "dishes"}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Dishes Subtotal:</span>
                <span className="summary-val">{totalAmount} ETB</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Delivery Fee (Addis):</span>
                <span className="summary-val">
                  {deliveryFee === 0 ? (
                    <span className="free-delivery-badge">FREE (Over 600 ETB)</span>
                  ) : (
                    `${deliveryFee} ETB`
                  )}
                </span>
              </div>

              {totalAmount < 600 && (
                <div className="delivery-upsell-note">
                  💡 Add <strong>{600 - totalAmount} ETB</strong> more to qualify for <strong>Free Delivery</strong>!
                </div>
              )}

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span className="total-label">Grand Total:</span>
                <div className="total-val-group">
                  <span className="total-currency">ETB</span>
                  <span className="total-amount-number">{grandTotal}</span>
                </div>
              </div>
            </div>

            <div className="telebirr-ready-callout">
              <span className="callout-icon">📱</span>
              <p className="callout-text">
                Instant TeleBirr / CBE Birr verification on the next step.
              </p>
            </div>

            <Link to="/checkout" className="btn-primary btn-checkout-cta">
              <span>Proceed to TeleBirr Checkout</span>
              <span className="btn-arrow">→</span>
            </Link>

            <p className="summary-guarantee-note">
              🔒 Safe payment simulation • 30-min guaranteed hot delivery
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
