import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "./cartStore";
import { validate } from "./validate";
import Field from "./Field";

function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    // Mark interactive fields as visited
    setTouched({ name: true, phone: true, area: true });

    if (hasErrors) {
      const firstInvalidField = Object.keys(errors)[0];
      document.getElementById(firstInvalidField)?.focus();
      return;
    }

    setSubmitting(true);
    setServerError(null);

    try {
      // Simulated checkout API call
      await new Promise((res) => setTimeout(res, 1000));

      clearCart();
      alert(`Order confirmed for ${form.name}!\nTotal: ${total} ETB\nDelivering to: ${form.area}`);
      navigate("/menu", { replace: true });
    } catch (err) {
      setServerError("Network error occurred. Your order details were preserved.");
      const firstInvalidField = Object.keys(errors)[0] || "phone";
      document.getElementById(firstInvalidField)?.focus();
    } finally {
      setSubmitting(false);
    }
  }

  const show = (field) => Boolean(touched[field] && errors[field]);

  return (
    <div className="checkout-page">
      <h2>Complete Your Delivery Details</h2>
      <p className="checkout-subtitle">Enter your TeleBirr details to finish ordering.</p>

      {serverError && (
        <div role="alert" className="server-error-banner">
          ⚠️ {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="checkout-form">
        <Field
          id="name"
          name="name"
          label="Recipient Full Name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          showError={show("name")}
          placeholder="e.g. Abebe Bikila"
        />

        <Field
          id="phone"
          name="phone"
          type="tel"
          label="TeleBirr Phone Number"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          showError={show("phone")}
          placeholder="09... or +2519..."
        />

        <Field
          id="area"
          name="area"
          type="select"
          label="Delivery Sub-city / Neighborhood"
          value={form.area}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.area}
          showError={show("area")}
        >
          <option value="Bole">Bole</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Megenagna">Megenagna</option>
          <option value="Piassa">Piassa</option>
          <option value="Sarbet">Sarbet</option>
        </Field>

        <Field
          id="notes"
          name="notes"
          type="textarea"
          label="Special Delivery Instructions (Optional)"
          value={form.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. Near Edna Mall, 2nd gate"
        />

        <button
          type="submit"
          className="submit-order-btn"
          disabled={submitting || items.length === 0}
        >
          {submitting ? "Sending your order..." : `Order ${total} ETB`}
        </button>
      </form>
    </div>
  );
}

export default Checkout;