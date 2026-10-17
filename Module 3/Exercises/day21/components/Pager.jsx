import Link from "next/link";

export default function Pager({ page, totalPages, sort, dir }) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between border-t pt-4">
      <Link
        href={`/orders?page=${page - 1}&sort=${sort}&dir=${dir}`}
        aria-disabled={page <= 1}
        tabIndex={page <= 1 ? -1 : undefined}
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border bg-white ${
          page <= 1 ? "pointer-events-none opacity-40 text-slate-400" : "hover:bg-slate-50 text-slate-700"
        }`}
      >
        ← Previous
      </Link>

      <span className="text-xs text-slate-500 font-medium">
        Page {page} of {totalPages}
      </span>

      <Link
        href={`/orders?page=${page + 1}&sort=${sort}&dir=${dir}`}
        aria-disabled={page >= totalPages}
        tabIndex={page >= totalPages ? -1 : undefined}
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border bg-white ${
          page >= totalPages ? "pointer-events-none opacity-40 text-slate-400" : "hover:bg-slate-50 text-slate-700"
        }`}
      >
        Next →
      </Link>
    </nav>
  );
}