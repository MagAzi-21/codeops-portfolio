import PropTypes from "prop-types";
import Card from "./Card";
import Dish from "./Dish";

function DishList({ dishes, onAddToOrder }) {
  if (dishes.length === 0) {
    return <p className="empty-state">No dishes found in this category.</p>;
  }

  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Dish {...dish} onAddToOrder={onAddToOrder} />
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
  onAddToOrder: PropTypes.func.isRequired,
};

export default DishList;