import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from?.pathname ?? "/menu";

  function handleLogin(e) {
    e.preventDefault();
    if (!name.trim()) return;
    login(name);
    navigate(destination, { replace: true });
  }

  return (
    <div className="login-box">
      <h2>Sign In</h2>
      <p>Sign in to proceed to checkout.</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="search-input"
          required
        />
        <button type="submit" className="submit-btn" style={{ marginTop: "12px" }}>
          Sign In & Continue
        </button>
      </form>
    </div>
  );
}

export default Login;