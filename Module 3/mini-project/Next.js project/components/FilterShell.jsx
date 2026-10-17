"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div>
      <div className="flex gap-2 my-4">
        {["All", "Main", "Vegan"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1 text-xs font-semibold rounded-full transition ${
              selectedCategory === cat
                ? "bg-amber-600 text-white"
                : "bg-white border text-slate-700 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-400 mb-3">Filtering: {selectedCategory}</p>

      {/* Server Component renders here without pulling DishList or DishCard into client bundle */}
      {children}
    </div>
  );
}