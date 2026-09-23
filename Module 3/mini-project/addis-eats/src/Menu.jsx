import { useState, useContext, useMemo, useCallback } from "react";
import CategoryBar from "./CategoryBar";
import Card from "./Card";
import Dish from "./Dish";
import OrderForm from "./OrderForm";
import { useFetch } from "./useFetch";
import { CartContext } from "./CartProvider";

const categories = ["All", "Main", "Vegan", "Dessert", "Drinks"];

function Menu() {
  const [category, setCategory] = useState("All");
  const { dispatch } = useContext(CartContext);
  const { data, loading, error } = useFetch("/dishes.json");

  // Stable callback passed down to avoid re-rendering Dish children
  const handleAdd = useCallback(
    (dish) => {
      dispatch({ type: "add", dish });
    },
    [dispatch]
  );

  // useMemo caches filtered dishes list across renders
  const filteredDishes = useMemo(() => {
    if (!data) return [];
    if (category === "All") return data;
    return data.filter((d) => d.category === category);
  }, [data, category]);

  return (
    <div className="menu-container">
      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      {loading && <p className="status-msg">Loading authentic dishes...</p>}
      {error && <p className="status-msg err">{error}</p>}

      {!loading && !error && filteredDishes.length === 0 && (
        <p className="status-msg">No dishes found in category "{category}".</p>
      )}

      {!loading && !error && filteredDishes.length > 0 && (
        <div className="dish-list">
          {filteredDishes.map((dish) => (
            <Card key={dish.id}>
              <Dish {...dish} onAdd={() => handleAdd(dish)} />
            </Card>
          ))}
        </div>
      )}

      <OrderForm />
    </div>
  );
}

export default Menu;