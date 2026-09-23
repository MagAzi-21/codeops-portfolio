import PropTypes from "prop-types";
import Card from "./Card";
import Dish from "./Dish";

function Menu({ dishes, category }) {
  const filteredDishes = category
    ? dishes.filter((dish) => dish.category === category)
    : dishes;

  if (filteredDishes.length === 0) {
    return <p className="empty-state">No {category} dishes found.</p>;
  }

  return (
    <div className="menu-list">
      {filteredDishes.map((dish) => (
        <Card key={dish.id}>
          <Dish {...dish} />
        </Card>
      ))}
    </div>
  );
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool,
    })
  ).isRequired,
  category: PropTypes.string,
};

export default Menu;