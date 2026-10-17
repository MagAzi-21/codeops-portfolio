import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-3xl font-bold mb-2">404 - Not Found</h2>
      <p className="text-gray-600 mb-4">No dish or route exists at this path.</p>
      <Link href="/menu" className="text-blue-600 underline">
        Return to Menu
      </Link>
    </div>
  );
}