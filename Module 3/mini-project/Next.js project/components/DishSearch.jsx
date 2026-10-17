"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function DishSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [inputVal, setInputVal] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const page = parseInt(searchParams.get("page") || "1", 10);

  // Debounce typing by 300ms to eliminate redundant requests per keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(inputVal.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [inputVal]);

  // Array key with keepPreviousData prevents list flashing empty between searches
  const key = ["/api/dishes", debouncedQuery, page];

  const { data, isValidating } = useSWR(
    key,
    ([url, q, p]) => fetcher(`${url}?q=${encodeURIComponent(q)}&page=${p}`),
    {
      keepPreviousData: true,
      dedupingInterval: 2000,
    }
  );

  function handlePageChange(newPage) {
    router.push(`/search?page=${newPage}`);
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
          Search Dishes (Debounced 300ms)
        </label>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type dish name (e.g. kitfo, wat, shiro)..."
          className="w-full p-3 border rounded-xl text-sm focus:outline-amber-600 bg-white"
        />
      </div>

      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>{isValidating ? "Fetching latest results..." : "Up to date"}</span>
        <span>Showing Page {page}</span>
      </div>

      <div className="space-y-3">
        {data?.items?.length > 0 ? (
          data.items.map((dish) => (
            <div
              key={dish.id}
              className="p-4 bg-white border rounded-xl flex justify-between items-center shadow-sm"
            >
              <div>
                <h4 className="font-bold text-slate-800">{dish.name}</h4>
                <p className="text-xs text-slate-400">{dish.category}</p>
              </div>
              <span className="font-extrabold text-amber-700">{dish.price} ETB</span>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-sm text-slate-400 bg-white border rounded-xl">
            No matching dishes found.
          </div>
        )}
      </div>

      {/* Query string pagination */}
      <div className="flex justify-between items-center border-t pt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-4 py-1.5 border rounded text-xs font-semibold disabled:opacity-40 bg-white"
        >
          ← Previous
        </button>
        <span className="text-xs text-slate-600">
          Page {page} of {data?.totalPages || 1}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!data || page >= data.totalPages}
          className="px-4 py-1.5 border rounded text-xs font-semibold disabled:opacity-40 bg-white"
        >
          Next →
        </button>
      </div>
    </div>
  );
}