export default function CategoryBar() {
  const categories = ["All Categories", "Main Dishes", "Vegan & Fasting"];

  return (
    <div className="flex gap-2 my-4 overflow-x-auto pb-1">
      {categories.map((cat, index) => (
        <span
          key={cat}
          className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
            index === 0
              ? "bg-amber-600 text-white"
              : "bg-white border text-slate-700 hover:bg-slate-100"
          }`}
        >
          {cat}
        </span>
      ))}
    </div>
  );
}