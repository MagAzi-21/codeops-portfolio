import React, { useState, createContext, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useParams,
  useSearchParams,
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";

// Fake Auth Context for Exercise 7
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (name) => setUser({ name });
  const logout = () => setUser(null);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Exercise 7: Guard component remembering origin
function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

// Exercise 3: Layout with Header, NavLink bar, Outlet, and Footer
function Layout() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
        <h2>Day 06 Router Lab</h2>
        <div>
          {user ? (
            <span>Welcome, {user.name} <button onClick={logout}>Logout</button></span>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </header>
      <nav style={{ display: "flex", gap: "12px", margin: "16px 0" }}>
        <NavLink to="/" end style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal", color: isActive ? "blue" : "black" })}>Home</NavLink>
        <NavLink to="/menu" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal", color: isActive ? "blue" : "black" })}>Menu</NavLink>
        <NavLink to="/checkout" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal", color: isActive ? "blue" : "black" })}>Checkout (Protected)</NavLink>
      </nav>
      <main style={{ minHeight: "200px" }}>
        <Outlet />
      </main>
      <footer style={{ borderTop: "1px solid #ccc", marginTop: "20px", paddingTop: "10px", fontSize: "0.8rem" }}>
        Addis Eats Routing © 2026
      </footer>
    </div>
  );
}

// Exercise 4: Landing page index route
function Home() {
  return <div><h3>Welcome to Addis Eats</h3><p>Select Menu above to view our specials.</p></div>;
}

// Exercise 5 & 6: Menu reading/writing useSearchParams and linking to dynamic dish routes
const sampleDishes = [
  { id: "doro-wat", name: "Doro Wat", price: 240, category: "Main" },
  { id: "shiro", name: "Shiro", price: 120, category: "Vegan" },
  { id: "tibs", name: "Tibs", price: 280, category: "Main" },
];

function Menu() {
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("category") ?? "All";

  const visible = activeCategory === "All"
    ? sampleDishes
    : sampleDishes.filter((d) => d.category === activeCategory);

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        {["All", "Main", "Vegan"].map((cat) => (
          <button
            key={cat}
            onClick={() => setParams(cat === "All" ? {} : { category: cat })}
            style={{ fontWeight: activeCategory === cat ? "bold" : "normal" }}
          >
            {cat}
          </button>
        ))}
      </div>
      <ul>
        {visible.map((dish) => (
          <li key={dish.id} style={{ margin: "6px 0" }}>
            <Link to={`/menu/${dish.id}`}>{dish.name} - {dish.price} ETB</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Exercise 5: Dynamic Dish Detail using useParams
function DishDetail() {
  const { id } = useParams();
  const dish = sampleDishes.find((d) => d.id === id);

  if (!dish) {
    return <p style={{ color: "red" }}>No dish called "{id}" was found.</p>;
  }

  return (
    <div>
      <h3>{dish.name}</h3>
      <p>Category: {dish.category}</p>
      <p>Price: {dish.price} ETB</p>
      <Link to="/menu">← Back to Menu</Link>
    </div>
  );
}

// Protected Checkout Page
function Checkout() {
  return <div><h3>Protected Checkout</h3><p>Payment and TeleBirr delivery form renders here.</p></div>;
}

// Login Screen handling redirected destination
function Login() {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname ?? "/menu";

  return (
    <div>
      <h3>Sign In Required</h3>
      <button onClick={() => { login("Abebe"); navigate(from, { replace: true }); }}>
        Sign In as Abebe
      </button>
    </div>
  );
}

// Exercise 4: Not Found splat route
function NotFound() {
  return <div><h3>404 - Page Not Found</h3><Link to="/">Back to Home</Link></div>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="menu/:id" element={<DishDetail />} />
            <Route
              path="checkout"
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}