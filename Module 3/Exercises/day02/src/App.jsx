import PropTypes from "prop-types";

// Exercise 3: Card wrapper component that renders children
function Card({ children }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "12px", margin: "10px 0" }}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

// Exercise 1 & 2: Dish with PropTypes, default currency, and guarded && spicy badge
function Dish({ name, price, currency = "ETB", spicy = false }) {
  return (
    <div>
      <h3>
        {name} {spicy && <span style={{ color: "red", fontSize: "0.85rem" }}>• Spicy</span>}
      </h3>
      <p>
        {price} {currency}
      </p>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
};

// Data array with category & spicy properties
const dishesData = [
  { id: 1, name: "Doro Wat", price: 240, category: "Main", spicy: true },
  { id: 2, name: "Shiro", price: 120, category: "Vegan", spicy: false },
  { id: 3, name: "Tibs", price: 280, category: "Main", spicy: true },
  { id: 4, name: "Beyaynetu", price: 180, category: "Vegan", spicy: false },
];

// Exercise 4 & 5: Filter by category, early return empty state, and map with id key
function DishList({ dishes, selectedCategory }) {
  const filtered = dishes.filter((dish) => dish.category === selectedCategory);

  // Exercise 4: Early return for empty state
  if (filtered.length === 0) {
    return <p>No {selectedCategory} dishes found.</p>;
  }

  // Exercise 5: Render filtered list with map and stable keys
  return (
    <div>
      {filtered.map((dish) => (
        <Card key={dish.id}>
          <Dish {...dish} />
        </Card>
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool,
    })
  ).isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

function App() {
  const currentCategory = "Main";

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h1>Day 02 Exercises</h1>
      <p>Current Filter: <strong>{currentCategory}</strong></p>
      <DishList dishes={dishesData} selectedCategory={currentCategory} />
    </div>
  );
}

export default App;