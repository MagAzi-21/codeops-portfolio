import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "./useFetch";
import { CartContext } from "./CartProvider";

function DishDetail() {
  const { id } = useParams();
  const { dispatch } = useContext(CartContext);
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  if (loading) return <p className="status-msg">Loading dish details...</p>;
  if (error) return <p className="status-msg err">{error}</p>;

  // Matches either by numerical ID or converted slug
  const dish = dishes?.find((d) => String(d.id) === id || d.name.toLowerCase().replace(/\s+/g, "-") === id);

  if (!dish) {
    return (
      <div className="status-msg">
        <h3>No dish found</h3>
        <p>There is no dish matching "{id}".</p>
        <Link to="/menu" className="back-link">Back to Menu</Link>
      </div>
    );
  }

  return (
    <div className="dish-detail-card">
      <h2>
        {dish.name} {dish.spicy && <span className="badge-spicy">• Spicy</span>}
      </h2>
      <p className="detail-category">Category: <strong>{dish.category}</strong></p>
      <p className="detail-price">{dish.price} ETB</p>
      <div className="detail-actions">
        <button className="submit-btn" onClick={() => dispatch({ type: "add", dish })}>
          Add to Cart
        </button>
        <Link to="/menu" className="back-link">← Back to Menu</Link>
      </div>
    </div>
  );
}

export default DishDetail;