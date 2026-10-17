import Link from "next/link";

export default function HomePage() {
  return (
    <div className="py-8 space-y-4">
      <h1 className="text-3xl font-extrabold text-slate-900">
        Middleware & Authentication Architecture
      </h1>
      <p className="text-slate-600 text-sm">
        Explore 3-tier authorization guards, edge middleware redirection, open-redirect defense, and scoped data access.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 pt-4">
        <Link href="/orders" className="p-4 bg-white border rounded-xl hover:border-amber-500 shadow-sm block">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Guarded Orders →</h3>
          <p className="text-xs text-slate-500">Middleware + Page session verification.</p>
        </Link>
        <Link href="/checkout" className="p-4 bg-white border rounded-xl hover:border-amber-500 shadow-sm block">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Checkout Flow →</h3>
          <p className="text-xs text-slate-500">Protected route checking session existence.</p>
        </Link>
        <Link href="/kitchen" className="p-4 bg-white border rounded-xl hover:border-amber-500 shadow-sm block">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Kitchen Display →</h3>
          <p className="text-xs text-slate-500">Enforces staff role check on the server.</p>
        </Link>
      </div>
    </div>
  );
}