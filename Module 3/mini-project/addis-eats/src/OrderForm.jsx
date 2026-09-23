import { useState } from "react";
import PropTypes from "prop-types";

function OrderForm({ total, onResetTotal }) {
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
    onResetTotal();
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3>Delivery Details</h3>

      <div className="field">
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Abebe Bikila"
          required
        />
      </div>

      <div className="field">
        <label>TeleBirr Phone</label>
        <input
          name="phone"
          type="text"
          value={form.phone}
          onChange={handleChange}
          placeholder="09... or +2519..."
          required
        />
        {form.phone && !isPhoneValid && (
          <p className="err">Use format 09... or +2519...</p>
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
        disabled={!isPhoneValid || !form.name.trim() || total === 0}
      >
        Pay {total} ETB with TeleBirr
      </button>
    </form>
  );
}

OrderForm.propTypes = {
  total: PropTypes.number.isRequired,
  onResetTotal: PropTypes.func.isRequired,
};

export default OrderForm;