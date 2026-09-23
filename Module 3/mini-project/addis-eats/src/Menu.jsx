import { useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";
import { dishes } from "./data";

const categories = ["All", "Main", "Vegan", "Dessert", "Grill"];

function Menu() {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const shownDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  function handleAddToOrder(price) {
    setTotal((prevTotal) => prevTotal + price);
  }

  function handleResetTotal() {
    setTotal(0);
  }

  return (
    <div className="menu-container">
      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      <DishList dishes={shownDishes} onAddToOrder={handleAddToOrder} />

      <div className="order-summary">
        <h3>Current Total: <span>{total} ETB</span></h3>
      </div>

      <OrderForm total={total} onResetTotal={handleResetTotal} />
    </div>
  );
}

export default Menu;