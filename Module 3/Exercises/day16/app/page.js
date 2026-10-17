import Link from "next/link";

export default function HomePage() {
  return (
    <div className="py-8 space-y-4">
      <h1 className="text-3xl font-extrabold text-slate-900">
        Data Fetching: SWR & Client Cache
      </h1>
      <p className="text-slate-600 text-sm">
        Explore live polling, optimistic caching, debounced search keys, and server fallback paint.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 pt-4">
        <Link
          href="/orders/ord_101"
          className="p-5 bg-white border rounded-xl hover:border-amber-500 transition block shadow-sm"
        >
          <h3 className="font-bold text-slate-800 mb-1">Live Order Status →</h3>
          <p className="text-xs text-slate-500">
            Initial data pre-rendered on the server; SWR polls every 5s in the background.
          </p>
        </Link>

        <Link
          href="/search"
          className="p-5 bg-white border rounded-xl hover:border-amber-500 transition block shadow-sm"
        >
          <h3 className="font-bold text-slate-800 mb-1">Debounced Search & Pagination →</h3>
          <p className="text-xs text-slate-500">
            Search with 300ms debounce, null keying, and non-flashing pagination.
          </p>
        </Link>
      </div>
    </div>
  );
}