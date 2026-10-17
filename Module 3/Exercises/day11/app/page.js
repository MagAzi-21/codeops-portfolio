import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome to Addis Eats</h1>
      <p className="text-gray-600 mb-6">Authentic Ethiopian cuisine on Next.js App Router.</p>
      <Link href="/menu" className="bg-amber-600 text-white px-4 py-2 rounded font-medium">
        Explore Menu →
      </Link>
    </div>
  );
}