import PropTypes from "prop-types";

function Dish({ name, price, currency = "ETB", spicy = false, onAdd }) {
  return (
    <div className="dish">
      <div className="dish-details">
        <h3>
          {name} {spicy && <span className="badge-spicy">• Spicy</span>}
        </h3>
        <p>
          {price} {currency}
        </p>
      </div>
      <button className="add-btn" onClick={onAdd}>
        + Add
      </button>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
};

export default Dish;