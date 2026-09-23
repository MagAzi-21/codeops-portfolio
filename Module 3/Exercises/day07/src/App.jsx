import React, { createContext, useContext, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSlice } from "@reduxjs/toolkit";

// ==========================================
// Exercise 1: Context with guarded hook
// ==========================================
const DemoCartContext = createContext(null);

function useDemoCart() {
  const ctx = useContext(DemoCartContext);
  if (!ctx) {
    throw new Error("useDemoCart must be used inside a DemoCartProvider");
  }
  return ctx;
}

// ==========================================
// Exercise 2: Split Auth and Theme Providers
// ==========================================
const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState({ name: "Mikiyas" });
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

const ThemeContext = createContext(null);
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

// ==========================================
// Exercise 4 & 6: Zustand Cart Store with Persist
// ==========================================
export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (dish) => set((s) => ({ items: [...s.items, dish] })),
      remove: (id) => set((s) => ({ items: s.items.filter((d) => d.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: "day07-cart-storage" }
  )
);

// ==========================================
// Exercise 7: Redux Toolkit Slice for Comparison
// ==========================================
export const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); // Immer handles immutability
    },
    remove: (state, action) => {
      state.items = state.items.filter((d) => d.id !== action.payload);
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

// Component exercising narrow selectors (Exercise 5)
function CartItemCount() {
  // Narrow selector: only re-renders when count changes
  const itemCount = useCartStore((s) => s.items.length);
  return <p>Items in cart (Zustand): <strong>{itemCount}</strong></p>;
}

function CartButtons() {
  // Narrow selector: actions never change, zero re-renders on state change
  const addItem = useCartStore((s) => s.addItem);
  const clear = useCartStore((s) => s.clear);

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <button onClick={() => addItem({ id: Date.now(), name: "Shiro", price: 120 })}>
        + Add Shiro
      </button>
      <button onClick={clear}>Clear</button>
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme}>
      Active Theme: {theme} (Click to toggle)
    </button>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div style={{ maxWidth: "500px", margin: "30px auto", fontFamily: "sans-serif" }}>
          <h2>Day 07 Exercises - State Management</h2>
          <ThemeToggle />
          <hr style={{ margin: "20px 0" }} />
          <CartItemCount />
          <CartButtons />
          <p style={{ marginTop: "16px", color: "green", fontSize: "0.9rem" }}>
            ✓ Persist middleware active: Add items, refresh the page, and the cart survives!
          </p>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}