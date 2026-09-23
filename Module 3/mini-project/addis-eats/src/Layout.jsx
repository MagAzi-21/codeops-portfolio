import { NavLink, Outlet, Link } from "react-router-dom";
import CartBadge from "./CartBadge";
import { useAuth } from "./useAuth";

function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1>Addis Eats</h1>
          </Link>
          <p>Authentic Ethiopian cuisine delivered across Addis.</p>
        </div>
        <div className="header-actions">
          <CartBadge />
          <div className="auth-box">
            {user ? (
              <div>
                <span>{user.name}</span>
                <button onClick={logout} className="auth-btn">Sign Out</button>
              </div>
            ) : (
              <Link to="/login" className="auth-link">Sign In</Link>
            )}
          </div>
        </div>
      </header>

      <nav className="navbar">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>Home</NavLink>
        <NavLink to="/menu" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>Menu</NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>Cart</NavLink>
        <NavLink to="/checkout" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>Checkout</NavLink>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats. Built with React Router & Zustand.</p>
      </footer>
    </div>
  );
}

export default Layout;