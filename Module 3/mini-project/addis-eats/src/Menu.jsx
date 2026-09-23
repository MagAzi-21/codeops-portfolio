import { useState, useEffect, useRef } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";
import { fetchDishes } from "./api";

const categories = ["All", "Main", "Vegan", "Dessert", "Beverages"];

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const searchInputRef = useRef(null);

  // Auto-focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Fetch menu data whenever category changes; abort past inflight requests
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchDishes(category, controller.signal)
      .then((data) => {
        setDishes(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [category]);

  // Sync document title with current item count
  useEffect(() => {
    document.title = `Addis Eats - ${dishes.length} items`;
  }, [dishes]);

  function handleAddToOrder(price) {
    setTotal((prev) => prev + price);
  }

  function handleResetTotal() {
    setTotal(0);
  }

  const visibleDishes = dishes.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="menu-container">
      <div className="search-bar">
        <input
          ref={searchInputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search menu dishes..."
          className="search-input"
        />
      </div>

      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      {loading && <p className="status-msg">Loading the menu...</p>}
      {error && <p className="status-msg err">{error}</p>}
      {!loading && !error && (
        <DishList dishes={visibleDishes} onAddToOrder={handleAddToOrder} />
      )}

      <div className="order-summary">
        <h3>Current Total: <span>{total} ETB</span></h3>
      </div>

      <OrderForm total={total} onResetTotal={handleResetTotal} />
    </div>
  );
}

export default Menu;