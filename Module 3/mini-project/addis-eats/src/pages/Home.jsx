import { Link } from "react-router-dom";
import { dishes } from "../data/dishes";
import DishCard from "../components/DishCard";

function Home() {
  const chefSpecials = dishes.filter((d) => d.isChefSpecial).slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Spotlight Section */}
      <section className="hero-section" aria-label="Welcome Spotlight">
        <div className="hero-container container">
          <div className="hero-content">
            <div className="hero-pill-badge">
              <span className="pill-dot">●</span>
              <span>Authentic Ethiopian Culinary Heritage</span>
            </div>

            <h1 className="hero-headline">
              Taste the Soul of <br />
              <span className="text-gradient-amber">Addis Ababa</span> Delivered.
            </h1>

            <p className="hero-subtitle">
              Savor slow-simmered Doro Wat, sizzling charcoal Shekla Tibs, and vibrant
              fasting Beyaynetu platters. Handcrafted daily with stone-ground pure Teff
              Injera and Gojjam berbere spices.
            </p>

            <div className="hero-cta-group">
              <Link to="/menu" className="btn-primary hero-btn">
                <span>Explore Full Menu</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
              <Link
                to="/menu?category=Vegan%2FFasting"
                className="btn-secondary hero-btn"
              >
                <span>🌱 Fasting & Vegan Specials</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="hero-metrics">
              <div className="metric-item">
                <span className="metric-value">30m</span>
                <span className="metric-label">Average Delivery</span>
              </div>
              <div className="metric-divider" aria-hidden="true"></div>
              <div className="metric-item">
                <span className="metric-value">100%</span>
                <span className="metric-label">Pure Teff Injera</span>
              </div>
              <div className="metric-divider" aria-hidden="true"></div>
              <div className="metric-item">
                <span className="metric-value">4.9 ★</span>
                <span className="metric-label">Guest Rating</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-frame">
              <img
                src="/images/hero-feast.jpg"
                alt="Elaborate traditional Ethiopian feast on a woven mesob basket"
                className="hero-image"
                loading="eager"
                width="800"
                height="450"
              />
              <div className="hero-image-overlay"></div>
              <div className="hero-floating-card">
                <span className="floating-badge">🔥 Fresh from the Shekla</span>
                <p className="floating-text">Chef’s Signature Doro & Tibs Feast</p>
                <span className="floating-price">From 260 ETB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Craft Highlights */}
      <section className="features-section container" aria-label="Our Culinary Standards">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🏺</span>
            </div>
            <h3 className="feature-title">Earthenware Clay-Pot Cooking</h3>
            <p className="feature-desc">
              We simmer our stews in authentic clay pots to lock in rich, earthy aromas and smoky depth you cannot replicate in modern cookware.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🌾</span>
            </div>
            <h3 className="feature-title">100% Highland Teff Injera</h3>
            <p className="feature-desc">
              Naturally gluten-free, fermented for 3 days to achieve the perfect spongy eyelet texture and distinct tangy note.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🌶️</span>
            </div>
            <h3 className="feature-title">Artisanal Berbere & Niter Kibbeh</h3>
            <p className="feature-desc">
              Hand-blended with 16 sun-dried spices, korerima (Ethiopian cardamom), and clarified butter infused with sacred herbs.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">⚡</span>
            </div>
            <h3 className="feature-title">Seamless TeleBirr Checkout</h3>
            <p className="feature-desc">
              Instant mobile payment verification across Bole, Kazanchis, Piassa, Sarbet, and all major Addis Ababa sub-cities.
            </p>
          </div>
        </div>
      </section>

      {/* Chef's Curated Specials */}
      <section className="specials-section container" aria-label="Chef's Specials">
        <div className="section-header">
          <div className="section-title-wrap">
            <span className="section-tag">Chef’s Recommendations</span>
            <h2 className="section-heading">Signature Ethiopian Classics</h2>
          </div>
          <Link to="/menu" className="section-view-all">
            View All Dishes →
          </Link>
        </div>

        <div className="dishes-grid">
          {chefSpecials.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* Cultural Heritage Feature: Coffee Ceremony */}
      <section className="heritage-section container" aria-label="Cultural Coffee Ceremony">
        <div className="heritage-card">
          <div className="heritage-image-wrapper">
            <img
              src="/images/ethiopian-buna.jpg"
              alt="Traditional Ethiopian Coffee Ceremony in clay jebena"
              className="heritage-img"
              loading="lazy"
              width="600"
              height="450"
            />
          </div>
          <div className="heritage-content">
            <span className="heritage-tag">Ritual & Community</span>
            <h2 className="heritage-title">The Ethiopian Buna Ceremony (ቡና ማፍላት)</h2>
            <p className="heritage-text">
              In Ethiopia, coffee is never merely consumed—it is celebrated. Green Yirgacheffe
              beans are pan-roasted before you, ground fresh, and brewed in a blackened clay
              Jebena. Accompanied by white roasted popcorn and frankincense smoke, it is a timeless
              invitation of friendship and warmth.
            </p>
            <div className="heritage-quote">
              <p>“Buna dabo naw” — Coffee is our bread, our fellowship, and our heartbeat.</p>
            </div>
            <Link to="/menu?category=Beverages" className="btn-secondary">
              Order Buna & Spiced Drinks
            </Link>
          </div>
        </div>
      </section>

      {/* Primary Bottom CTA Banner */}
      <section className="cta-banner-section container" aria-label="Order Call To Action">
        <div className="cta-banner">
          <div className="cta-banner-text">
            <h2>Craving Fresh Ethiopian Flavors Tonight?</h2>
            <p>Hot, fragrant stews and sizzling tibs ready for rapid dispatch right to your doorstep.</p>
          </div>
          <Link to="/menu" className="btn-primary cta-banner-btn">
            Order Now with TeleBirr
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
