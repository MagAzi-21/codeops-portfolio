"use client";

import { useActionState } from "react";
import { placeOrderAction } from "@/app/actions";

export default function CheckoutPage() {
  // Exercise 3: useActionState provides `isPending` flag to disable button and prevent duplicate orders
  const [state, formAction, isPending] = useActionState(placeOrderAction, {
    success: false,
    orderId: null,
    error: null,
  });

  return (
    <div className="max-w-md mx-auto bg-white border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-1">Accessible TeleBirr Checkout</h2>
        <p className="text-xs text-slate-500">
          Form submits via Enter or click; button disables while pending to reject double submits.
        </p>
      </div>

      {state.success ? (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl space-y-2">
          <h3 className="font-bold text-sm">Order Confirmed!</h3>
          <p className="text-xs">Order ID: <code className="font-mono">{state.orderId}</code></p>
        </div>
      ) : (
        /* Form uses native onSubmit rather than button onClick, enabling keyboard submission */
        <form action={formAction} className="space-y-4">
          {state.error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {state.error}
            </div>
          )}

          <div>
            <label htmlFor="name-input" className="block text-xs font-bold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              id="name-input"
              name="name"
              type="text"
              required
              placeholder="e.g. Almaz Bekele"
              className="touch-target w-full border rounded-xl p-3 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="phone-input" className="block text-xs font-bold text-slate-700 mb-1">
              TeleBirr Mobile Number
            </label>
            {/* type="tel" and inputMode="numeric" triggers mobile numeric keypad automatically */}
            <input
              id="phone-input"
              name="phone"
              type="tel"
              inputMode="numeric"
              required
              placeholder="0911223344"
              className="touch-target w-full border rounded-xl p-3 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="dish-select" className="block text-xs font-bold text-slate-700 mb-1">
              Select Dish
            </label>
            <select
              id="dish-select"
              name="dish"
              className="touch-target w-full border rounded-xl p-3 text-sm bg-white focus:outline-none"
            >
              <option value="Doro Wat">Doro Wat (260 ETB)</option>
              <option value="Special Kitfo">Special Kitfo (320 ETB)</option>
            </select>
          </div>

          {/* Exercise 3: Disabled while pending stops rapid tap duplicates */}
          <button
            type="submit"
            disabled={isPending}
            className="touch-target w-full py-3 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-sm rounded-xl transition disabled:bg-slate-300 disabled:pointer-events-none"
          >
            {isPending ? "Placing Order..." : "Confirm & Pay via TeleBirr"}
          </button>
        </form>
      )}
    </div>
  );
}