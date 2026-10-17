"use client";

import { useCart } from "./Providers";

export default function AddToCartButton({ dish }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(dish)}
      className="px-3 py-1.5 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 transition"
    >
      + Add to Cart
    </button>
  );
}