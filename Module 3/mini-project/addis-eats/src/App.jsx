import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { useCart } from "./context/useCart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import ErrorBoundary from "./components/ErrorBoundary";

// Page Views
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

function Layout() {
  const { toast, dismissToast } = useCart();

  return (
    <div className="app-shell">
      <Header />
      <main className="main-content" id="main-content">
        <Outlet />
      </main>
      <Footer />
      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary errorMessage="An unexpected error occurred in Addis Eats application.">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="dish/:id" element={<DishDetail />} />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;