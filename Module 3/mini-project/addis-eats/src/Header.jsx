import CartBadge from "./CartBadge";

function Header() {
  return (
    <header className="header">
      <div className="brand">
        <h1>Addis Eats</h1>
        <p>Order authentic Ethiopian food across Addis.</p>
      </div>
      <CartBadge />
    </header>
  );
}

export default Header;