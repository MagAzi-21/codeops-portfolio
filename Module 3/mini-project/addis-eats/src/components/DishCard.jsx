import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function DishCard({ dish }) {
  const { addToCart } = useCart();

  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(dish, 1);
  };

  return (
    <article className="dish-card" aria-label={dish.name}>
      <Link to={`/dish/${dish.id}`} className="dish-card-image-link" tabIndex={-1}>
        <div className="dish-card-image-wrapper">
          <img
            src={dish.image}
            alt={dish.name}
            className="dish-card-img"
            loading="lazy"
            width="400"
            height="300"
          />
          <div className="dish-card-badges">
            {dish.badge && <span className="dish-tag badge-gold">{dish.badge}</span>}
            {dish.spicy ? (
              <span className="dish-tag badge-spicy">🌶️ Berbere</span>
            ) : (
              <span className="dish-tag badge-mild">🌱 Mild / Fasting</span>
            )}
          </div>
        </div>
      </Link>

      <div className="dish-card-content">
        <div className="dish-card-header">
          <div>
            <span className="dish-amharic">{dish.amharic}</span>
            <h3 className="dish-title">
              <Link to={`/dish/${dish.id}`} className="dish-title-link">
                {dish.name}
              </Link>
            </h3>
          </div>
          <span className="dish-rating">★ {dish.rating}</span>
        </div>

        <p className="dish-description">{dish.description}</p>

        <div className="dish-card-meta">
          <span className="dish-preptime">⏱ {dish.prepTime}</span>
          <span className="dish-category-label">{dish.category}</span>
        </div>

        <div className="dish-card-footer">
          <div className="dish-price-group">
            <span className="dish-price-currency">ETB</span>
            <span className="dish-price-amount">{dish.price}</span>
          </div>

          <button
            type="button"
            className="btn-add-order"
            onClick={handleAddClick}
            aria-label={`Add ${dish.name} to cart for ${dish.price} ETB`}
          >
            <span className="btn-add-icon">+</span>
            <span className="btn-add-text">Add to Order</span>
          </button>
        </div>
      </div>
    </article>
  );
}

DishCard.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    amharic: PropTypes.string,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,
    image: PropTypes.string.isRequired,
    badge: PropTypes.string,
    rating: PropTypes.number,
    description: PropTypes.string,
    prepTime: PropTypes.string,
  }).isRequired,
};

export default DishCard;
