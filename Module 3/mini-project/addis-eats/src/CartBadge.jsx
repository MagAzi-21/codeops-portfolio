import { useContext } from "react";
import { CartContext } from "./CartProvider";

function CartBadge() {
  const { items, total } = useContext(CartContext);

  return (
    <div className="cart-badge">
      <span className="badge-count">🛒 {items.length} items</span>
      <span className="badge-total">{total} ETB</span>
    </div>
  );
}

export default CartBadge;