import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold text-red-600 mb-2">404 - Not Found</h2>
      <p className="text-gray-600 mb-4">The requested dish or path does not exist.</p>
      <Link href="/menu" className="text-blue-600 underline">
        Return to Menu
      </Link>
    </div>
  );
}