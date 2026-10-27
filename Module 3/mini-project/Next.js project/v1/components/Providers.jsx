"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within Providers");
  }
  return context;
}

export default function Providers({ children }) {
  const [items, setItems] = useState([]);

  function addItem(dish) {
    setItems((prev) => [...prev, dish]);
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}