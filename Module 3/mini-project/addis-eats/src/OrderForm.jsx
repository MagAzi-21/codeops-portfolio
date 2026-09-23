import { useState, useContext } from "react";
import { CartContext } from "./CartProvider";

function OrderForm() {
  const { items, total, dispatch } = useContext(CartContext);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });

  const isPhoneValid = /^(?:\+251|0)9\d{8}$/.test(form.phone);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Order confirmed for ${form.name}!\nTotal: ${total} ETB\nDelivering to: ${form.area}`);
    setForm({ name: "", phone: "", area: "Bole" });
    dispatch({ type: "clear" });
  }

  return (
    <div className="checkout-panel">
      <h3>Checkout & Order Details</h3>

      {items.length > 0 && (
        <ul className="cart-item-list">
          {items.map((item, index) => (
            <li key={index}>
              <span>{item.name} - {item.price} ETB</span>
              <button
                type="button"
                className="remove-btn"
                onClick={() => dispatch({ type: "remove", index })}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Customer Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Abebe Bikila"
            required
          />
        </div>

        <div className="field">
          <label>TeleBirr Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="09... or +2519..."
            required
          />
          {form.phone && !isPhoneValid && (
            <p className="err">Valid Ethiopian number required (09... or +2519...)</p>
          )}
        </div>

        <div className="field">
          <label>Delivery Area</label>
          <select name="area" value={form.area} onChange={handleChange}>
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Piassa">Piassa</option>
            <option value="Sarbet">Sarbet</option>
            <option value="CMC">CMC</option>
          </select>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={!isPhoneValid || !form.name.trim() || items.length === 0}
        >
          Pay {total} ETB with TeleBirr
        </button>
      </form>
    </div>
  );
}

export default OrderForm;