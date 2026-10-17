export default function Loading() {
  return (
    <div className="py-6">
      <div className="h-6 w-40 bg-slate-200 rounded animate-pulse mb-6"></div>
      <div className="grid sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}