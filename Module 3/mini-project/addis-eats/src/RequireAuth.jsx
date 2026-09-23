import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./useAuth";

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p className="status-msg">Checking authentication...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;