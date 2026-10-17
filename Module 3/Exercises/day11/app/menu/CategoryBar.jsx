export default function CategoryBar() {
  return (
    <div className="flex gap-2 my-4">
      {["All", "Main", "Vegan"].map((cat) => (
        <span key={cat} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
          {cat}
        </span>
      ))}
    </div>
  );
}   