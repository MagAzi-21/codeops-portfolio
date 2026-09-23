import React, { createContext, useContext, useReducer, useMemo, useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";

// --- Exercise 1: ThemeContext ---
const ThemeContext = createContext("light");

function DeeplyNestedThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <div style={{ marginTop: "12px", padding: "8px", background: theme === "dark" ? "#333" : "#eee", color: theme === "dark" ? "#fff" : "#000" }}>
      Deeply nested component theme: <strong>{theme}</strong>
    </div>
  );
}

// --- Exercise 2: Custom Hook useFetch ---
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);

    fetch(url, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Network request failed");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [url]);

  return { data, loading, error };
}

// --- Exercise 3: Pure cartReducer ---
function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, items: [...state.items, action.dish] };
    case "remove":
      return { ...state, items: state.items.filter((d) => d.id !== action.id) };
    case "clear":
      return { items: [] };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

// Verification test directly outside React
const testState = cartReducer({ items: [] }, { type: "add", dish: { id: 1, name: "Test Dish", price: 100 } });
console.assert(testState.items.length === 1, "cartReducer add failed");

// --- Exercise 5 & 6: CartContext + CartProvider with useMemo ---
const CartContext = createContext(null);

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const total = state.items.reduce((s, d) => s + d.price, 0);

  // useMemo prevents all consumers from re-rendering on unrelated parent renders
  const value = useMemo(
    () => ({ items: state.items, dispatch, total }),
    [state.items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// --- Exercise 7: React.memo & useCallback child component ---
const MemoizedDishItem = React.memo(function DishItem({ dish, onAdd }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "6px 0", display: "flex", justifyContent: "space-between" }}>
      <span>{dish.name} - {dish.price} ETB</span>
      <button onClick={() => onAdd(dish)}>Add</button>
    </div>
  );
});

MemoizedDishItem.propTypes = {
  dish: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
};

// Consumer Component
function CartView() {
  const { items, dispatch, total } = useContext(CartContext);
  return (
    <div style={{ marginTop: "16px", border: "1px solid #007bff", padding: "12px", borderRadius: "6px" }}>
      <h3>Cart ({items.length} items)</h3>
      <p>Running Total: <strong>{total} ETB</strong></p>
      <button onClick={() => dispatch({ type: "clear" })} disabled={items.length === 0}>
        Clear Cart
      </button>
    </div>
  );
}

// Main App Container
function App() {
  const [theme, setTheme] = useState("light");
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  // Stable handler for React.memo child
  const { dispatch } = useContext(CartContext) || {};
  const handleAdd = useCallback(
    (dish) => {
      if (dispatch) dispatch({ type: "add", dish });
    },
    [dispatch]
  );

  return (
    <ThemeContext.Provider value={theme}>
      <CartProvider>
        <div style={{ maxWidth: "520px", margin: "20px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
          <h1>Day 05 Exercises</h1>
          <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
            Toggle Theme
          </button>
          <DeeplyNestedThemedButton />

          <hr style={{ margin: "20px 0" }} />

          <h2>Dishes via useFetch</h2>
          {loading && <p>Loading dishes...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {dishes && dishes.map((dish) => (
            <MemoizedDishItem key={dish.id} dish={dish} onAdd={handleAdd} />
          ))}

          <CartView />
        </div>
      </CartProvider>
    </ThemeContext.Provider>
  );
}

export default App;