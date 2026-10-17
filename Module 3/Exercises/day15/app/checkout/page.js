"use client";

import { useActionState } from "react";
import { placeOrderAction, cancelOrderAction } from "@/app/actions";

export default function CheckoutPage() {
  const [state, formAction, isPending] = useActionState(placeOrderAction, {
    success: false,
    fieldErrors: {},
  });

  return (
    <div className="bg-white border rounded-2xl p-6 sm:p-8 max-w-md mx-auto shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Checkout (Dynamic SSR)</h2>
        <p className="text-xs text-slate-500">
          Forms work with and without JavaScript enabled using Server Actions.
        </p>
      </div>

      {state.success ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-3">
          <p className="text-sm font-bold text-green-700">Order Placed Successfully!</p>
          <p className="text-xs text-slate-600">Order ID: <code className="font-mono">{state.orderId}</code></p>
          <button
            onClick={async () => {
              const res = await cancelOrderAction(state.orderId);
              alert(res.message);
            }}
            className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
          >
            Cancel Order (Auth Check Demo)
          </button>
        </div>
      ) : (
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="e.g. Almaz Bekele"
              className="w-full border rounded p-2 text-sm focus:outline-amber-600"
            />
            {state.fieldErrors?.name && (
              <p className="text-xs text-red-600 mt-1">{state.fieldErrors.name[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700">TeleBirr Phone Number</label>
            <input
              name="phone"
              type="text"
              placeholder="0911223344 or +251911223344"
              className="w-full border rounded p-2 text-sm focus:outline-amber-600"
            />
            {state.fieldErrors?.phone && (
              <p className="text-xs text-red-600 mt-1">{state.fieldErrors.phone[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700">Select Dish</label>
            <select name="dishId" className="w-full border rounded p-2 text-sm bg-white">
              <option value="kitfo">Special Kitfo (320 ETB)</option>
              <option value="doro-wat">Doro Wat (260 ETB)</option>
              <option value="shiro">Shiro Tegamino (140 ETB)</option>
              <option value="tibs">Sizzling Beef Tibs (280 ETB)</option>
            </select>
            {state.fieldErrors?.dishId && (
              <p className="text-xs text-red-600 mt-1">{state.fieldErrors.dishId[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 bg-amber-600 text-white text-sm font-bold rounded-lg hover:bg-amber-700 disabled:bg-slate-300 transition"
          >
            {isPending ? "Placing Order..." : "Confirm & Pay via TeleBirr"}
          </button>
        </form>
      )}
    </div>
  );
}