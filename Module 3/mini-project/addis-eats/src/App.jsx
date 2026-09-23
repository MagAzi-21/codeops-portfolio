import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./CartProvider";
import { AuthProvider } from "./AuthContext";
import Layout from "./Layout";
import Home from "./Home";
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import Cart from "./Cart";
import OrderForm from "./OrderForm";
import RequireAuth from "./RequireAuth";
import Login from "./Login";
import "./App.css";

function NotFound() {
  return (
    <div className="status-msg">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="back-link">Return to Home</Link>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <OrderForm />
                  </RequireAuth>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;