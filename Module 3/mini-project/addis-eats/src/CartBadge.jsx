import { useCartStore } from "./cartStore";

function CartBadge() {
  // Narrow selectors: re-renders only when the items array or derived total changes
  const itemCount = useCartStore((s) => s.items.length);
  const total = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.price, 0)
  );

  return (
    <div className="cart-badge">
      <span className="badge-count">🛒 {itemCount} items</span>
      <span className="badge-total">{total} ETB</span>
    </div>
  );
}

export default CartBadge;