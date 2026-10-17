import Link from "next/link";

export default function HomePage() {
  return (
    <div className="py-8 space-y-6">
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900 mb-2">
          Data Representation: Charts vs Tables
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mb-6">
          Exploring when to use visual shape (Recharts) versus exact tabular values (semantic HTML table), along with full URL-driven sorting, paging, and honest empty states.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard"
            className="p-5 border rounded-xl hover:border-amber-500 transition block shadow-sm bg-slate-50"
          >
            <h3 className="font-bold text-slate-800 mb-1">Visual Analytics Dashboard →</h3>
            <p className="text-xs text-slate-500">
              Server-aggregated summaries rendered with Recharts Bar & Line charts with zero-origin axes and ETB unit labels.
            </p>
          </Link>

          <Link
            href="/orders"
            className="p-5 border rounded-xl hover:border-amber-500 transition block shadow-sm bg-slate-50"
          >
            <h3 className="font-bold text-slate-800 mb-1">Paginated Orders Table →</h3>
            <p className="text-xs text-slate-500">
              Semantic table with right-aligned currency, `aria-sort` headers, and URL-persisted search parameters.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}