"use client";

import { useCart } from "./Providers";

export default function AddToCartButton({ dish }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(dish)}
      className="px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded hover:bg-amber-700"
    >
      + Add to Cart
    </button>
  );
}