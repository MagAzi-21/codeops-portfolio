import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { deliveryAreas } from "../data/dishes";

// Strict TeleBirr regex specified in requirements: ^(?:\+2519\d{8}|09\d{8})$
const TELEBIRR_REGEX = /^(?:\+2519\d{8}|09\d{8})$/;

function Checkout() {
  const { cartItems, totalAmount, clearCart } = useCart();

  // Form State
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    area: "Bole",
    address: "",
    notes: "",
    paymentMethod: "telebirr",
  });

  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);

  // Delivery fee calculation
  const selectedAreaObj = deliveryAreas.find((a) => a.id === form.area) || deliveryAreas[0];
  const deliveryFee = totalAmount >= 600 || totalAmount === 0 ? 0 : selectedAreaObj.fee;
  const grandTotal = totalAmount + deliveryFee;

  // Validation logic
  const validateForm = () => {
    const errors = {};

    if (!form.fullName.trim()) {
      errors.fullName = "Please enter the recipient full name.";
    } else if (form.fullName.trim().length < 2) {
      errors.fullName = "Name must be at least 2 characters.";
    }

    const cleanPhone = form.phone.trim().replace(/\s+/g, "");
    if (!cleanPhone) {
      errors.phone = "TeleBirr phone number is required.";
    } else if (!TELEBIRR_REGEX.test(cleanPhone)) {
      errors.phone = "Must be valid Ethiopian TeleBirr format: 09XXXXXXXX or +2519XXXXXXXX";
    }

    if (!form.area) {
      errors.area = "Please choose your delivery sub-city.";
    }

    if (!form.address.trim()) {
      errors.address = "Please specify your house/building or nearest landmark.";
    }

    return errors;
  };

  const errors = validateForm();
  const hasErrors = Object.keys(errors).length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      area: true,
      address: true,
    });

    if (hasErrors) {
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate realistic network latency for TeleBirr API handoff
      await new Promise((resolve) => setTimeout(resolve, 1400));

      const generatedOrderId = `AE-${Math.floor(100000 + Math.random() * 900000)}`;
      const receiptData = {
        orderId: generatedOrderId,
        createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        customer: {
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          area: form.area,
          address: form.address.trim(),
          notes: form.notes.trim(),
          paymentMethod: form.paymentMethod,
        },
        items: [...cartItems],
        subtotal: totalAmount,
        deliveryFee,
        grandTotal,
        estimatedDelivery: selectedAreaObj.estTime,
      };

      setOrderReceipt(receiptData);
      clearCart();
    } catch (err) {
      console.error("Order processing error:", err);
      alert("A simulated transaction issue occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If order was successfully submitted, show the confirmation receipt screen
  if (orderReceipt) {
    return (
      <div className="checkout-page container">
        <div className="receipt-card" role="status" aria-label="Order Confirmation Receipt">
          <div className="receipt-success-icon-wrap">
            <span className="receipt-checkmark">✓</span>
          </div>

          <div className="receipt-header">
            <span className="receipt-pill">Order Confirmed & TeleBirr Verified</span>
            <h1 className="receipt-title">Thank You, {orderReceipt.customer.fullName}!</h1>
            <p className="receipt-subtitle">
              Your feast is now being prepared in our clay pots. Hot dispatch is scheduled to arrive in{" "}
              <strong>{orderReceipt.estimatedDelivery}</strong>.
            </p>
          </div>

          <div className="receipt-meta-box">
            <div className="meta-cell">
              <span className="meta-label">Order Identifier</span>
              <span className="meta-value order-id">{orderReceipt.orderId}</span>
            </div>
            <div className="meta-cell">
              <span className="meta-label">Time Placed</span>
              <span className="meta-value">{orderReceipt.createdAt}</span>
            </div>
            <div className="meta-cell">
              <span className="meta-label">Payment Gateway</span>
              <span className="meta-value payment-tag">
                {orderReceipt.customer.paymentMethod === "telebirr"
                  ? "📱 TeleBirr Instant Pay"
                  : "💵 Cash on Delivery"}
              </span>
            </div>
            <div className="meta-cell">
              <span className="meta-label">Destination</span>
              <span className="meta-value">{orderReceipt.customer.area} ({orderReceipt.customer.address})</span>
            </div>
          </div>

          {/* Receipt Breakdown Table */}
          <div className="receipt-items-block">
            <h2 className="receipt-items-heading">Itemized Culinary Receipt</h2>
            <div className="receipt-table" role="table">
              <div className="receipt-table-header" role="row">
                <span className="th-dish">Dish</span>
                <span className="th-qty">Qty</span>
                <span className="th-price">Unit</span>
                <span className="th-total">Total</span>
              </div>
              {orderReceipt.items.map((item) => (
                <div key={item.id} className="receipt-table-row" role="row">
                  <div className="td-dish">
                    <span className="td-dish-name">{item.name}</span>
                    {item.amharic && (
                      <span className="td-dish-amharic">({item.amharic})</span>
                    )}
                  </div>
                  <span className="td-qty">{item.quantity}×</span>
                  <span className="td-price">{item.price} ETB</span>
                  <span className="td-total">{item.price * item.quantity} ETB</span>
                </div>
              ))}
            </div>

            <div className="receipt-financial-summary">
              <div className="receipt-row">
                <span>Subtotal:</span>
                <span>{orderReceipt.subtotal} ETB</span>
              </div>
              <div className="receipt-row">
                <span>Delivery ({orderReceipt.customer.area}):</span>
                <span>
                  {orderReceipt.deliveryFee === 0
                    ? "FREE"
                    : `${orderReceipt.deliveryFee} ETB`}
                </span>
              </div>
              <div className="receipt-row grand-total-receipt">
                <span>Total Charged:</span>
                <span className="grand-total-highlight">
                  {orderReceipt.grandTotal} ETB
                </span>
              </div>
            </div>
          </div>

          <div className="receipt-instructions-box">
            <p className="rider-tip">
              🛵 Our rider will call your TeleBirr number (<strong>{orderReceipt.customer.phone}</strong>) upon arrival at your landmark.
            </p>
            {orderReceipt.customer.notes && (
              <p className="customer-notes">
                <em>Special note attached: “{orderReceipt.customer.notes}”</em>
              </p>
            )}
          </div>

          <div className="receipt-actions">
            <Link to="/menu" className="btn-primary receipt-back-btn">
              Explore More Dishes & Order Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Guard for empty cart
  if (cartItems.length === 0) {
    return (
      <div className="checkout-page container">
        <div className="empty-results-card" role="status">
          <div className="empty-results-icon">🛍️</div>
          <h2 className="empty-results-title">No Dishes to Checkout</h2>
          <p className="empty-results-text">
            Your cart is currently empty. Please add dishes from our authentic menu before proceeding to TeleBirr checkout.
          </p>
          <Link to="/menu" className="btn-primary">
            Explore Addis Eats Menu →
          </Link>
        </div>
      </div>
    );
  }

  const showError = (field) => Boolean(touched[field] && errors[field]);

  return (
    <div className="checkout-page container">
      <div className="checkout-header-banner">
        <span className="section-tag">Final Step</span>
        <h1 className="checkout-title">TeleBirr Express Delivery</h1>
        <p className="checkout-subtitle">
          Confirm your delivery address in Addis Ababa and finalize with secure TeleBirr verification.
        </p>
      </div>

      <div className="checkout-split-layout">
        {/* Left Column: Delivery Form */}
        <div className="checkout-form-column">
          <form onSubmit={handleSubmit} noValidate className="checkout-form-card">
            <h2 className="form-section-title">1. Recipient Details</h2>

            {/* Recipient Name */}
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                className={`form-input ${showError("fullName") ? "input-error" : ""}`}
                placeholder="e.g. Almaz Bekele"
                value={form.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={showError("fullName")}
                aria-describedby={showError("fullName") ? "fullName-err" : undefined}
                required
              />
              {showError("fullName") && (
                <p id="fullName-err" className="form-error-msg" role="alert">
                  ⚠️ {errors.fullName}
                </p>
              )}
            </div>

            {/* TeleBirr Phone Number */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                TeleBirr Mobile Number <span className="required-star">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={`form-input ${showError("phone") ? "input-error" : ""}`}
                placeholder="e.g. 0911234567 or +251911234567"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={showError("phone")}
                aria-describedby={showError("phone") ? "phone-err" : "phone-help"}
                required
              />
              <p id="phone-help" className="form-help-text">
                Accepts Ethiopian formats: <code>09XXXXXXXX</code> or <code>+2519XXXXXXXX</code>
              </p>
              {showError("phone") && (
                <p id="phone-err" className="form-error-msg" role="alert">
                  ⚠️ {errors.phone}
                </p>
              )}
            </div>

            <h2 className="form-section-title" style={{ marginTop: "28px" }}>
              2. Delivery Address in Addis
            </h2>

            {/* Delivery Sub-city / Neighborhood */}
            <div className="form-group">
              <label htmlFor="area" className="form-label">
                Sub-City / Neighborhood <span className="required-star">*</span>
              </label>
              <select
                id="area"
                name="area"
                className="form-select"
                value={form.area}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                {deliveryAreas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name} — {area.estTime} (Fee: {area.fee} ETB)
                  </option>
                ))}
              </select>
            </div>

            {/* Street / Landmark Address */}
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Specific Landmark or House Number <span className="required-star">*</span>
              </label>
              <input
                id="address"
                name="address"
                type="text"
                className={`form-input ${showError("address") ? "input-error" : ""}`}
                placeholder="e.g. Behind Edna Mall, Morning Star Mall 3rd Floor"
                value={form.address}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={showError("address")}
                aria-describedby={showError("address") ? "address-err" : undefined}
                required
              />
              {showError("address") && (
                <p id="address-err" className="form-error-msg" role="alert">
                  ⚠️ {errors.address}
                </p>
              )}
            </div>

            {/* Special Instructions */}
            <div className="form-group">
              <label htmlFor="notes" className="form-label">
                Special Kitchen or Delivery Instructions (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="2"
                className="form-textarea"
                placeholder="e.g. Extra hot mitmita on side, buzzer #4, ring upon arrival"
                value={form.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            <h2 className="form-section-title" style={{ marginTop: "28px" }}>
              3. Payment Selection
            </h2>

            <div className="payment-options-grid">
              <label
                className={`payment-option-card ${
                  form.paymentMethod === "telebirr" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="telebirr"
                  checked={form.paymentMethod === "telebirr"}
                  onChange={handleChange}
                  className="payment-radio"
                />
                <div className="payment-option-info">
                  <span className="payment-name">📱 TeleBirr Instant Pay</span>
                  <span className="payment-desc">Official ethio telecom mobile wallet</span>
                </div>
              </label>

              <label
                className={`payment-option-card ${
                  form.paymentMethod === "cod" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={handleChange}
                  className="payment-radio"
                />
                <div className="payment-option-info">
                  <span className="payment-name">💵 Cash or CBE on Delivery</span>
                  <span className="payment-desc">Pay directly when rider arrives</span>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary btn-submit-order"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="submitting-spinner-wrap">
                  <span className="spinner" aria-hidden="true"></span>
                  <span>Verifying via TeleBirr API...</span>
                </span>
              ) : (
                <span>Confirm & Dispatch Order ({grandTotal} ETB)</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Order Quick Summary */}
        <aside className="checkout-summary-column" aria-label="Review Items">
          <div className="checkout-summary-card">
            <h3 className="summary-title">Order Overview ({cartItems.length} items)</h3>

            <div className="mini-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="mini-item-row">
                  <div className="mini-item-left">
                    <span className="mini-item-qty">{item.quantity}×</span>
                    <div>
                      <span className="mini-item-name">{item.name}</span>
                      {item.spicy && <span className="mini-item-spicy">🌶️</span>}
                    </div>
                  </div>
                  <span className="mini-item-total">{item.price * item.quantity} ETB</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-totals-box">
              <div className="total-row-minor">
                <span>Dishes Subtotal:</span>
                <span>{totalAmount} ETB</span>
              </div>
              <div className="total-row-minor">
                <span>Delivery to {form.area}:</span>
                <span>{deliveryFee === 0 ? "FREE" : `${deliveryFee} ETB`}</span>
              </div>
              <div className="total-row-grand">
                <span>Total Amount:</span>
                <span className="total-grand-number">{grandTotal} ETB</span>
              </div>
            </div>

            <div className="trust-assurance-box">
              <p>⏱ Estimated Dispatch: <strong>{selectedAreaObj.estTime}</strong></p>
              <p>🍲 Hot Insulated Thermal Delivery</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
