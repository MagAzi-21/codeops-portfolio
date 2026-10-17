"use client";

import { useState } from "react";
import CategoryBar from "./CategoryBar";

export default function FilterShell({ children }) {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <CategoryBar activeCategory={category} onSelectCategory={setCategory} />
      <p className="text-xs text-slate-400 mb-3">Filtering: {category}</p>
      {/* Server Component renders here without pulling DishList or DishCard into client bundle */}
      {children}
    </div>
  );
}