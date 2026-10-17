import { notFound } from "next/navigation";
import Link from "next/link";
import { dishes } from "../dishes";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export default function DishDetailPage({ params }) {
  const { id } = params;
  const dish = dishes.find((d) => d.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <div className="p-6 border rounded-lg">
      <span className="text-xs font-semibold text-amber-700 uppercase">{dish.category}</span>
      <h2 className="text-2xl font-bold mt-1 mb-2">{dish.name}</h2>
      <p className="text-xl font-semibold text-gray-800 mb-4">{dish.price} ETB</p>
      <Link href="/menu" className="text-blue-600 hover:underline">
        ← Back to Menu
      </Link>
    </div>
  );
}