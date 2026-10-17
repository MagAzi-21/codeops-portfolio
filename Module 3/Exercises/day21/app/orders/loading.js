export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-slate-200 rounded"></div>
      <div className="border rounded-xl bg-white p-4 space-y-3">
        <div className="h-6 bg-slate-200 rounded w-full"></div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 bg-slate-100 rounded w-full"></div>
        ))}
      </div>
    </div>
  );
}