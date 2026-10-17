export default function Loading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 w-32 bg-slate-200 rounded"></div>
      <div className="grid sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}