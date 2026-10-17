"use client";

export default function CategoryBar({ activeCategory, onSelectCategory }) {
  const categories = ["All", "Main", "Vegan"];

  return (
    <div className="flex gap-2 my-4">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelectCategory(cat)}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition ${
            activeCategory === cat
              ? "bg-amber-600 text-white"
              : "bg-white border text-slate-700 hover:bg-slate-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}