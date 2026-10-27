import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-page container" role="status">
      <div className="not-found-card">
        <span className="not-found-badge">404 Error</span>
        <h1 className="not-found-title">Dishes Lost in the Highlands</h1>
        <p className="not-found-desc">
          The culinary path you were seeking could not be found. It looks like this page was moved or doesn't exist.
        </p>
        <div className="not-found-actions">
          <Link to="/menu" className="btn-primary">
            Browse Authentic Menu Catalog →
          </Link>
          <Link to="/" className="btn-secondary">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
