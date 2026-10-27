import { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { CartContext } from "./cartStoreContext";


const STORAGE_KEY = "addis_eats_cart_v2";

export function CartProvider({ children }) {
  // Initialize cart from localStorage with defensive parsing
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {
      console.warn("Failed to retrieve cart items from localStorage:", err);
    }
    return [];
  });

  // Toast feedback state for micro-interactions
  const [toast, setToast] = useState(null);
  const [badgePulse, setBadgePulse] = useState(false);

  // Synchronize state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.warn("Failed to persist cart items to localStorage:", err);
    }
  }, [cartItems]);

  // Helper to trigger badge pulse & toast
  const triggerFeedback = useCallback((dishName, countAdded = 1) => {
    setBadgePulse(true);
    setTimeout(() => setBadgePulse(false), 600);

    setToast({
      id: Date.now(),
      message: `Added ${countAdded > 1 ? `${countAdded}x ` : ""}"${dishName}" to your order!`,
      type: "success",
    });
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  // Add to cart with customizable quantity
  const addToCart = useCallback((dish, quantity = 1) => {
    if (!dish || !dish.id) return;
    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === dish.id);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return updated;
      } else {
        return [...prevItems, { ...dish, quantity: qty }];
      }
    });

    triggerFeedback(dish.name, qty);
  }, [triggerFeedback]);

  // Update specific item quantity
  const updateQuantity = useCallback((dishId, newQuantity) => {
    setCartItems((prevItems) => {
      const qty = parseInt(newQuantity, 10);
      if (isNaN(qty) || qty <= 0) {
        return prevItems.filter((item) => item.id !== dishId);
      }
      return prevItems.map((item) =>
        item.id === dishId ? { ...item, quantity: qty } : item
      );
    });
  }, []);

  // Remove item by dish id
  const removeFromCart = useCallback((dishId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== dishId));
  }, []);

  // Clear all items
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Derived totals
  const totalAmount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  const totalCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalAmount,
      totalCount,
      toast,
      dismissToast,
      badgePulse,
    }),
    [
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalAmount,
      totalCount,
      toast,
      dismissToast,
      badgePulse,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
