const categories = ["All", "Main", "Vegan"];

export default function CategoryBar() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 transition hover:border-amber-500 hover:bg-amber-100"
        >
          {category}
        </button>
      ))}
    </div>
  );
}
