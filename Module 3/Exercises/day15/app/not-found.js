import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center bg-white border rounded-2xl p-8">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">404 - Not Found</h2>
      <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
        The requested dish or route does not exist.
      </p>
      <Link href="/menu" className="px-5 py-2.5 bg-amber-600 text-white font-semibold text-sm rounded-lg hover:bg-amber-700">
        Return to Menu
      </Link>
    </div>
  );
}