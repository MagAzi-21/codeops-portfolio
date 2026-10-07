import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Layout from "./Layout";
import Home from "./Home";
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import RequireAuth from "./RequireAuth";
import Login from "./Login";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css";

// Lazy-load routes not required on the initial landing/menu paint
const Cart = lazy(() => import("./Cart"));
const Checkout = lazy(() => import("./Checkout"));

function RouteSkeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-bar title"></div>
      <div className="skeleton-bar content"></div>
      <div className="skeleton-bar content short"></div>
    </div>
  );
}

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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            
            {/* Menu isolated inside its own Error Boundary */}
            <Route
              path="menu"
              element={
                <ErrorBoundary errorMessage="Unable to load the menu catalog. Your cart and session remain safe.">
                  <Menu />
                </ErrorBoundary>
              }
            />

            <Route path="menu/:id" element={<DishDetail />} />

            {/* Cart lazy-loaded and boundary protected */}
            <Route
              path="cart"
              element={
                <ErrorBoundary errorMessage="Unable to display the cart right now.">
                  <Suspense fallback={<RouteSkeleton />}>
                    <Cart />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            {/* Checkout lazy-loaded and boundary protected */}
            <Route
              path="checkout"
              element={
                <RequireAuth>
                  <ErrorBoundary errorMessage="Checkout encountered an error. Your cart items are preserved.">
                    <Suspense fallback={<RouteSkeleton />}>
                      <Checkout />
                    </Suspense>
                  </ErrorBoundary>
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

export default App;