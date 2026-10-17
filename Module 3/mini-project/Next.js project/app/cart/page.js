"use client";

import Link from "next/link";
import { useCart } from "@/components/Providers";

export default function CartPage() {
  const { items, clearCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white border rounded-2xl p-6 max-w-lg mx-auto shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Food Cart</h2>
      <p className="text-slate-500 text-xs mb-6">
        Order lines and running ETB total managed in browser state[cite: 7].
      </p>

      {items.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-sm border rounded-lg bg-slate-50 mb-6">
          Your cart is currently empty.
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm border-b pb-2">
              <span className="font-medium text-slate-800">{item.name}</span>
              <span className="font-bold text-slate-900">{item.price} ETB</span>
            </div>
          ))}
          <div className="flex justify-between items-center text-base font-black border-t pt-3">
            <span>Total:</span>
            <span className="text-amber-700">{total} ETB</span>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-red-600 underline hover:text-red-800"
          >
            Clear Cart
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <Link href="/menu" className="text-xs text-blue-600 hover:underline">
          ← Back to Menu
        </Link>
        <Link
          href="/checkout"
          className="px-5 py-2.5 bg-amber-600 text-white text-sm font-bold rounded-lg hover:bg-amber-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}