import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-hero">
      <h2>Welcome to Addis Eats</h2>
      <p>Discover traditional Ethiopian dishes prepared fresh every day.</p>
      <div className="home-links">
        <Link to="/menu" className="cta-btn">Browse Full Menu</Link>
        <Link to="/menu?category=Vegan" className="cta-secondary">View Fasting / Vegan Specials</Link>
      </div>
    </div>
  );
}

export default Home;