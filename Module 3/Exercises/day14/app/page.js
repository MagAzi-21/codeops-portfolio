import Link from "next/link";

export default function HomePage() {
  return (
    <div className="py-6 space-y-4">
      <h1 className="text-2xl font-bold">Exercise: API Routes & Server Actions</h1>
      <p className="text-slate-600 text-sm">
        Testing Route Handlers, 422 validations, and server actions.
      </p>
      <div className="flex gap-4">
        <Link href="/api/dishes" className="text-blue-600 underline text-sm" target="_blank">
          View GET /api/dishes →
        </Link>
        <Link href="/checkout" className="text-amber-700 underline text-sm font-semibold">
          Test Order Form (Server Action) →
        </Link>
      </div>
    </div>
  );
}