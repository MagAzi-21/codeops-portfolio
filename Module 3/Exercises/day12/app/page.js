import Link from "next/link";

export default function HomePage() {
  return (
    <div className="py-12 text-center">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
        Exercise 1: Root Layout & Static Home
      </h1>
      <p className="text-slate-600 max-w-md mx-auto mb-6">
        The home page is prerendered statically at build time.
      </p>
      <Link
        href="/menu"
        className="px-5 py-2.5 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700"
      >
        View Menu Segment →
      </Link>
    </div>
  );
}