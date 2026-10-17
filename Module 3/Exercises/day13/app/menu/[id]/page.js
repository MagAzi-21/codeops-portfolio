import { notFound } from "next/navigation";
import Link from "next/link";
import { dishes } from "../dishes";
import AddToCartButton from "@/components/AddToCartButton";

async function getDish(id) {
  return dishes.find((d) => d.id === id);
}

async function getReviews(id) {
  return [`Top rated preparation for ${id}`, "Authentic spices and injera."];
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const [dish, reviews] = await Promise.all([getDish(id), getReviews(id)]);

  if (!dish) {
    notFound();
  }

  return (
    <div className="p-6 border rounded-lg bg-white">
      <span className="text-xs font-semibold text-amber-700 uppercase">{dish.category}</span>
      <h2 className="text-2xl font-bold mt-1 mb-2">{dish.name}</h2>
      <p className="text-xl font-bold text-gray-800 mb-4">{dish.price} ETB</p>

      <div className="mb-6">
        <AddToCartButton dish={dish} />
      </div>

      <div className="border-t pt-4 mb-4">
        <h4 className="text-sm font-semibold mb-2">Customer Reviews (Parallel Fetch):</h4>
        <ul className="text-xs text-slate-600 space-y-1">
          {reviews.map((rev, i) => (
            <li key={i}>• {rev}</li>
          ))}
        </ul>
      </div>

      <Link href="/menu" className="text-blue-600 hover:underline text-sm">
        ← Back to Menu
      </Link>
    </div>
  );
}