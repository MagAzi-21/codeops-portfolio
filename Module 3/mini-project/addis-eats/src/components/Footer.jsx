import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-grid">
          {/* Brand & Culture */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="footer-brand-title">Addis Eats</span>
              <span className="footer-brand-subtitle">አዲስ ኢትስ • የኢትዮጵያ ምርጥ ጣዕም</span>
            </div>
            <p className="footer-desc">
              Preserving authentic Ethiopian culinary heritage through time-honored slow cooking,
              organic high-altitude berbere, and 100% pure teff injera. Handcrafted fresh daily in Addis Ababa.
            </p>
            <div className="telebirr-pill">
              <span className="telebirr-dot">●</span>
              <span>Official TeleBirr & CBE Birr Instant Checkout</span>
            </div>
          </div>

          {/* Service Areas */}
          <div className="footer-col">
            <h4 className="footer-heading">Addis Delivery Sub-Cities</h4>
            <ul className="footer-list">
              <li>📍 Bole (Atlas & Airport Corridor)</li>
              <li>📍 Kazanchis & UNECA Quarter</li>
              <li>📍 Piassa & Churchill Road</li>
              <li>📍 Megenagna & Signal</li>
              <li>📍 Sarbet, Karl Square & Bisrate Gabriel</li>
              <li>📍 Old Airport & Vatican Area</li>
              <li>📍 CMC, Ayat & Meganagna Heights</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/">Home Showcase</Link>
              </li>
              <li>
                <Link to="/menu">Full Culinary Menu</Link>
              </li>
              <li>
                <Link to="/menu?category=Vegan%2FFasting">Fasting / Vegan Specials</Link>
              </li>
              <li>
                <Link to="/cart">Your Active Cart</Link>
              </li>
              <li>
                <Link to="/checkout">TeleBirr Express Checkout</Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Promise */}
          <div className="footer-col">
            <h4 className="footer-heading">Kitchen & Dispatch</h4>
            <div className="footer-hours-card">
              <p className="hours-title">🕒 Operating Hours</p>
              <p className="hours-time">Monday – Sunday: 10:00 AM – 11:00 PM EAT</p>
              <p className="hours-note">Fresh batches of Teff Injera baked every 4 hours.</p>
            </div>
            <div className="trust-badge">
              <span className="badge-shield">🛡️</span>
              <span>100% Hot & Fresh Guarantee</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Addis Eats. Capstone Showcase. Built with React & Vite.</p>
          <div className="footer-meta-tags">
            <span>🇪🇹 Ethiopian Culinary Arts</span>
            <span>⚡ Zero Layout Shift</span>
            <span>📱 TeleBirr Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
