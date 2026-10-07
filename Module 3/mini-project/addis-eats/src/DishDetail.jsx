import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "./useFetch";
import { useCartStore } from "./cartStore";
import Modal from "./ui/Modal";

function DishDetail() {
  const { id } = useParams();
  const addItem = useCartStore((s) => s.addItem);
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalTriggerBtnRef = useRef(null);

  if (loading) return <p className="status-msg">Loading dish details...</p>;
  if (error) return <p className="status-msg err">{error}</p>;

  const dish = dishes?.find(
    (d) => String(d.id) === id || d.name.toLowerCase().replace(/\s+/g, "-") === id
  );

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
        <button className="submit-btn" onClick={() => addItem(dish)}>
          Add to Cart
        </button>
        <button
          ref={modalTriggerBtnRef}
          className="cta-secondary"
          onClick={() => setIsModalOpen(true)}
        >
          View Nutritional Info
        </button>
        <Link to="/menu" className="back-link">← Back to Menu</Link>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        triggerRef={modalTriggerBtnRef}
        title={`${dish.name} - Dietary Info`}
      >
        <p>Traditional Ethiopian cuisine prepared with fresh local ingredients.</p>
        <ul>
          <li>100% authentic spices</li>
          <li>Gluten-free teff injera available</li>
          <li>Spice level: {dish.spicy ? "High (Berbere)" : "Mild"}</li>
        </ul>
      </Modal>
    </div>
  );
}

export default DishDetail;