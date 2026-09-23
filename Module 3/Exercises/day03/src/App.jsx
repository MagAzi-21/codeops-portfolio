import { useState } from "react";
import PropTypes from "prop-types";

// Exercise 1: Dish with internal count state and Add button
function Dish({ name, price, onAddToOrder }) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);
    onAddToOrder(price);
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "8px 0", borderRadius: "6px" }}>
      <h4>
        {name} {count > 0 && <span style={{ color: "green" }}>({count} ordered)</span>}
      </h4>
      <p>{price} ETB</p>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onAddToOrder: PropTypes.func.isRequired,
};

// Exercise 2 & 3: Stateless CategoryBar receiving selected and onSelect
function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div style={{ display: "flex", gap: "8px", margin: "16px 0" }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            padding: "6px 12px",
            backgroundColor: selected === cat ? "#007bff" : "#e0e0e0",
            color: selected === cat ? "#fff" : "#000",
            border: "none",
            borderRadius: "16px",
            cursor: "pointer",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

// Exercise 6 & 7: Controlled Form with single state object and TeleBirr live validation
function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });

  // Regex checks for Ethiopian TeleBirr format: 09... or +2519... followed by 8 digits
  const isPhoneValid = /^(?:\+251|0)9\d{8}$/.test(form.phone);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Order placed for ${form.name}! Delivery to ${form.area}.`);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "24px", borderTop: "2px solid #eee", paddingTop: "16px" }}>
      <h3>Delivery Details</h3>
      <div style={{ marginBottom: "8px" }}>
        <input
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
          style={{ padding: "6px", width: "100%", boxSizing: "border-box" }}
        />
      </div>
      <div style={{ marginBottom: "8px" }}>
        <input
          name="phone"
          placeholder="Phone (09... or +2519...)"
          value={form.phone}
          onChange={handleChange}
          style={{ padding: "6px", width: "100%", boxSizing: "border-box" }}
        />
        {form.phone && !isPhoneValid && (
          <p style={{ color: "red", fontSize: "0.8rem", margin: "4px 0 0 0" }}>
            Invalid TeleBirr number (use 09... or +2519...)
          </p>
        )}
      </div>
      <div style={{ marginBottom: "12px" }}>
        <select
          name="area"
          value={form.area}
          onChange={handleChange}
          style={{ padding: "6px", width: "100%" }}
        >
          <option value="Bole">Bole</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Piassa">Piassa</option>
          <option value="Sarbet">Sarbet</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={!isPhoneValid || !form.name.trim()}
        style={{
          padding: "8px 16px",
          backgroundColor: !isPhoneValid || !form.name.trim() ? "#ccc" : "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: !isPhoneValid || !form.name.trim() ? "not-allowed" : "pointer",
        }}
      >
        Pay with TeleBirr
      </button>
    </form>
  );
}

const dishesData = [
  { id: 1, name: "Doro Wat", price: 240, category: "Main" },
  { id: 2, name: "Shiro", price: 120, category: "Vegan" },
  { id: 3, name: "Tibs", price: 280, category: "Main" },
  { id: 4, name: "Gomen", price: 110, category: "Vegan" },
];

function App() {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const categories = ["All", "Main", "Vegan", "Grill"];

  // Filtered list derived from state
  const shownDishes =
    category === "All"
      ? dishesData
      : dishesData.filter((d) => d.category === category);

  function handleAddToOrder(price) {
    setTotal((prev) => prev + price);
  }

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <h1>Day 03 Exercises</h1>

      {/* Exercise 2 & 3: Category chips with lifted state */}
      <CategoryBar categories={categories} selected={category} onSelect={setCategory} />

      {/* Exercise 4: Filtered list & Empty state */}
      {shownDishes.length === 0 ? (
        <p>No dishes found in this category.</p>
      ) : (
        shownDishes.map((dish) => (
          <Dish key={dish.id} {...dish} onAddToOrder={handleAddToOrder} />
        ))
      )}

      {/* Exercise 5: Running order total in ETB */}
      <div style={{ marginTop: "16px", fontWeight: "bold", fontSize: "1.2rem" }}>
        Total: {total} ETB
      </div>

      {/* Exercise 6 & 7: Form */}
      <OrderForm />
    </div>
  );
}

export default App;