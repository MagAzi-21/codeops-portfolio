"use client";

import { useActionState } from "react";
import Link from "next/link";
import { placeOrderAction, cancelOrderAction } from "@/app/actions";

export default function CheckoutPage() {
  // useActionState provides the pending flag to disable the button and block double submits
  const [state, formAction, isPending] = useActionState(placeOrderAction, {
    success: false,
    orderId: null,
    fieldErrors: {},
  });

  return (
    <div className="bg-white border rounded-2xl p-6 sm:p-8 max-w-md mx-auto shadow-sm space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 mb-1">Addis Eats Checkout</h1>
        <p className="text-xs text-slate-500">
          Submits on Enter or click; button disables while pending to reject double submits[cite: 60, 61].
        </p>
      </div>

      {state.success ? (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
          <p className="text-sm font-bold text-emerald-800">Order Placed Successfully!</p>
          <p className="text-xs text-slate-600">
            Order Reference: <code className="font-mono bg-white px-1.5 py-0.5 rounded border">{state.orderId}</code>
          </p>
          <button
            onClick={async () => {
              const res = await cancelOrderAction(state.orderId);
              alert(res.message);
            }}
            className="touch-target px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition"
          >
            Cancel Order (Auth Check Demo)
          </button>
        </div>
      ) : (
        /* Form uses native onSubmit rather than button onClick, preserving keyboard Enter submissions */
        <form action={formAction} className="space-y-4">
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
            {state.fieldErrors?.name && (
              <p className="text-xs text-red-600 mt-1 font-medium">{state.fieldErrors.name[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone-input" className="block text-xs font-bold text-slate-700 mb-1">
              TeleBirr Mobile Number
            </label>
            {/* type="tel" and inputMode="numeric" triggers numeric keypad on mobile devices */}
            <input
              id="phone-input"
              name="phone"
              type="tel"
              inputMode="numeric"
              required
              placeholder="0911223344"
              className="touch-target w-full border rounded-xl p-3 text-sm focus:outline-none"
            />
            {state.fieldErrors?.phone && (
              <p className="text-xs text-red-600 mt-1 font-medium">{state.fieldErrors.phone[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="dish-select" className="block text-xs font-bold text-slate-700 mb-1">
              Select Dish
            </label>
            <select
              id="dish-select"
              name="dishId"
              className="touch-target w-full border rounded-xl p-3 text-sm bg-white focus:outline-none"
            >
              <option value="kitfo">Special Kitfo (320 ETB)</option>
              <option value="doro-wat">Doro Wat (260 ETB)</option>
              <option value="shiro">Shiro Tegamino (140 ETB)</option>
              <option value="tibs">Sizzling Beef Tibs (280 ETB)</option>
            </select>
          </div>

          {/* Button disables immediately while pending to prevent rapid tap duplicate submissions */}
          <button
            type="submit"
            disabled={isPending}
            className="touch-target w-full py-3.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-sm rounded-xl transition disabled:bg-slate-300 disabled:pointer-events-none"
          >
            {isPending ? "Processing Order..." : "Confirm & Pay via TeleBirr"}
          </button>
        </form>
      )}

      <div className="text-center pt-2 border-t">
        <Link href="/menu" className="text-xs text-slate-500 hover:underline">
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
}