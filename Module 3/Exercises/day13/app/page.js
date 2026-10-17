import Link from "next/link";

export default function HomePage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-2">Exercise: Server & Client Components</h1>
      <p className="text-slate-600 mb-4">
        Exploring component execution boundaries, parallel server fetches, and bundle optimization.
      </p>
      <Link href="/menu" className="text-blue-600 underline font-medium">
        Go to Menu Route →
      </Link>
    </div>
  );
}