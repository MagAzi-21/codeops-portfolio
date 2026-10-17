"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function DishSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce keystrokes by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Null key when search query is empty avoids firing pointless requests
  const { data, isValidating } = useSWR(
    debouncedQuery ? `/api/dishes?q=${encodeURIComponent(debouncedQuery)}` : null,
    fetcher,
    { keepPreviousData: true }
  );

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div>
        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
          Search Dishes (Debounced 300ms)
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type 'kitfo', 'wat', or 'shiro'..."
          className="w-full p-3 border rounded-xl text-sm focus:outline-amber-600 bg-white"
        />
      </div>

      <div className="text-xs text-slate-400">
        {isValidating ? "Searching..." : debouncedQuery ? `Results for "${debouncedQuery}"` : "Start typing to search"}
      </div>

      <div className="space-y-2">
        {data?.map((dish) => (
          <div key={dish.id} className="p-3 bg-white border rounded-lg flex justify-between items-center shadow-sm">
            <span className="font-semibold text-sm text-slate-800">{dish.name}</span>
            <span className="font-bold text-amber-700 text-sm">{dish.price} ETB</span>
          </div>
        ))}
      </div>
    </div>
  );
}