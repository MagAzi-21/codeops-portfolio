"use client";

import { useState } from "react";
import CategoryBar from "./CategoryBar";

export default function FilterShell({ children }) {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <CategoryBar activeCategory={category} onSelectCategory={setCategory} />
      <p className="text-xs text-slate-400 mb-3">Active Category: {category}</p>
      {/* Server Components rendered inside children without leaking to client bundle */}
      {children}
    </div>
  );
}