import { useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import Card from "./Card";
import Dish from "./Dish";
import { useFetch } from "./useFetch";
import { CartContext } from "./CartProvider";

const categories = ["All", "Main", "Vegan", "Dessert"];

function Menu() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "All";

  const { dispatch } = useContext(CartContext);
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  function handleCategorySelect(newCategory) {
    if (newCategory === "All") {
      setParams({});
    } else {
      setParams({ category: newCategory });
    }
  }

  const filteredDishes = dishes
    ? category === "All"
      ? dishes
      : dishes.filter((d) => d.category === category)
    : [];

  return (
    <div className="menu-container">
      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={handleCategorySelect}
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
              <Link to={`/menu/${dish.id}`} style={{ textDecoration: "none", color: "inherit", flex: 1 }}>
                <Dish
                  {...dish}
                  onAdd={(e) => {
                    e.preventDefault();
                    dispatch({ type: "add", dish });
                  }}
                />
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;