import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function Header() {
  const { totalCount, totalAmount, badgePulse } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner container">
        {/* Brand / Logo */}
        <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
          <div className="logo-symbol" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" className="logo-svg">
              <circle cx="16" cy="16" r="14" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              <path
                d="M8 20C10 12 22 12 24 20"
                stroke="#d97706"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="16" cy="11" r="3" fill="#f59e0b" />
            </svg>
          </div>
          <div className="brand-text">
            <div className="brand-primary">
              <span className="brand-name">Addis Eats</span>
              <span className="brand-badge-pill">Express</span>
            </div>
            <span className="brand-tagline">አዲስ ኢትስ • Authentic Ethiopian Taste</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="main-nav" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Menu Catalog
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Order Review
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Checkout
          </NavLink>
        </nav>

        {/* Header Actions: Cart Button & Mobile Toggle */}
        <div className="header-actions">
          <Link
            to="/cart"
            className={`header-cart-btn ${badgePulse ? "pulse" : ""}`}
            aria-label={`Cart with ${totalCount} items totaling ${totalAmount} ETB`}
          >
            <span className="cart-icon" aria-hidden="true">🛒</span>
            <div className="cart-btn-info">
              <span className="cart-count-badge">{totalCount}</span>
              <span className="cart-amount-text">{totalAmount} ETB</span>
            </div>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="navigation" aria-label="Mobile Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
            onClick={closeMobileMenu}
          >
            🏠 Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
            onClick={closeMobileMenu}
          >
            🍲 Explore Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
            onClick={closeMobileMenu}
          >
            🛒 Cart ({totalCount} items • {totalAmount} ETB)
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
            onClick={closeMobileMenu}
          >
            💳 TeleBirr Checkout
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
