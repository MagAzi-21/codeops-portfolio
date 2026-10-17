import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center bg-white border rounded-2xl p-8">
      <span className="text-4xl">🍲</span>
      <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-2">
        Dish or Page Not Found
      </h2>
      <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
        We could not find the dish or route you requested.
      </p>
      <Link
        href="/menu"
        className="px-5 py-2.5 bg-amber-600 text-white font-semibold text-sm rounded-lg hover:bg-amber-700"
      >
        Return to Full Menu
      </Link>
    </div>
  );
}