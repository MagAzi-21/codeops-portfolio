"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function OrderStatus({ id, initialOrder }) {
  // SWR initialized with server fallbackData to eliminate initial spinner
  const { data, error, isValidating } = useSWR(
    `/api/orders/${id}`,
    fetcher,
    {
      fallbackData: initialOrder,
      refreshInterval: 5000, // Polls every 5s in background
      revalidateOnFocus: true,
    }
  );

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
        Failed to load live status for order #{id}.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border rounded-xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Order #{data.id}
          </span>
          <h3 className="text-xl font-bold text-slate-800">{data.item || "Addis Eats Order"}</h3>
        </div>
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full ${
            data.status === "Delivered"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-800 animate-pulse"
          }`}
        >
          {data.status}
        </span>
      </div>

      <div className="text-xs text-slate-500 border-t pt-3 flex justify-between">
        <span>Last checked: {data.updatedAt}</span>
        <span>{isValidating ? "Checking live status..." : "Waiting for next poll (5s)"}</span>
      </div>
    </div>
  );
}