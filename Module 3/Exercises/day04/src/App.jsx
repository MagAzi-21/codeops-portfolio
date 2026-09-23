import { useState, useEffect, useRef } from "react";

function App() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Exercise 7: Focus search input on mount with useRef
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Exercise 2, 3, 4, 5 & 6: Data fetching, res.ok check, abort controller, and category dependency
  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    async function loadDishes() {
      try {
        const res = await fetch("/dishes.json", { signal: ctrl.signal });
        
        // Exercise 4: Explicit res.ok guard
        if (!res.ok) {
          throw new Error("Could not load the menu dishes");
        }

        const data = await res.json();
        
        // Exercise 5: Filter by category if not 'All'
        const filtered =
          category === "All"
            ? data
            : data.filter((d) => d.category === category);

        setDishes(filtered);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadDishes();

    // Exercise 6: Cleanup function canceling stale requests
    return () => ctrl.abort();
  }, [category]);

  // Exercise 1: Update document.title when the list changes
  useEffect(() => {
    document.title = `Addis Eats - ${dishes.length} items`;
  }, [dishes]);

  // Local filter for search term
  const visibleDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "520px", margin: "30px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <h1>Day 04 Exercises</h1>

      {/* Exercise 7 input */}
      <div style={{ marginBottom: "16px" }}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>

      {/* Category filters */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {["All", "Main", "Vegan", "Dessert", "Beverages"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: "6px 12px",
              backgroundColor: category === cat ? "#007bff" : "#e9ecef",
              color: category === cat ? "#fff" : "#000",
              border: "none",
              borderRadius: "16px",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exercise 3: Early returns for loading, error, and empty states */}
      {loading && <p>Loading the menu...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && visibleDishes.length === 0 && (
        <p>No dishes found in this category.</p>
      )}

      {!loading && !error && (
        <div>
          {visibleDishes.map((dish) => (
            <div
              key={dish.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "10px",
                margin: "8px 0",
              }}
            >
              <h3>
                {dish.name} {dish.spicy && <span style={{ color: "red" }}>• Spicy</span>}
              </h3>
              <p>{dish.price} ETB</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;