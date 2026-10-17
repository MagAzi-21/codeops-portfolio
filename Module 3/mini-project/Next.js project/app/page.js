import Link from "next/link";

export default function HomePage() {
  return (
    <div className="py-12 text-center bg-white border rounded-2xl p-8 shadow-sm">
      <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
        Authentic Ethiopian Flavors
      </span>
      <h1 className="text-4xl font-extrabold text-slate-900 mt-4 mb-3">
        Welcome to Addis Eats
      </h1>
      <p className="text-slate-600 max-w-lg mx-auto mb-8 text-sm sm:text-base">
        Traditional injera dishes, wats, and tibs prepared fresh with authentic ingredients.
      </p>
      <Link
        href="/menu"
        className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition inline-block"
      >
        Explore Our Menu →
      </Link>
    </div>
  );
}