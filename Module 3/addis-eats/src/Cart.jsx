import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";

function Cart() {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h3>Your cart is empty</h3>
        <p>Check out our menu and add your favorite dishes.</p>
        <Link to="/menu" className="cta-btn">Go to Menu</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Order Summary</h2>
      <ul className="cart-item-list">
        {items.map((item, index) => (
          <li key={index}>
            <span>{item.name} - {item.price} ETB</span>
            <button className="remove-btn" onClick={() => remove(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total-box">
        <h3>Total: <span>{total} ETB</span></h3>
        <Link to="/checkout" className="submit-btn checkout-link">Proceed to Checkout</Link>
      </div>
    </div>
  );
}

export default Cart;