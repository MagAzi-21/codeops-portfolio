"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div>
      <div className="flex gap-2 my-4">
        {["All", "Main", "Vegan"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              activeCategory === cat ? "bg-amber-600 text-white" : "bg-gray-200 text-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-500 mb-2">Category Filter Active: {activeCategory}</p>
      {children}
    </div>
  );
}