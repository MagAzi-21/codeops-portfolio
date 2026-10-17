import { notFound } from "next/navigation";
import Link from "next/link";
import { dishes } from "../dishes";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateStaticParams() {
  return dishes.map((dish) => ({
    id: dish.id,
  }));
}

async function getDish(id) {
  return dishes.find((d) => d.id === id);
}

async function getReviews(id) {
  return [
    `Fresh and traditional preparation for ${id}.`,
    "Rich seasoning and authentic injera.",
  ];
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;

  // Parallel server fetch: two awaits in one wait
  const [dish, reviews] = await Promise.all([getDish(id), getReviews(id)]);

  if (!dish) {
    notFound();
  }

  return (
    <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="mb-4">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded">
          {dish.category}
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 mt-2 mb-2">
          {dish.name}
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {dish.description}
        </p>
        <p className="text-2xl font-black text-slate-900 mb-6">
          {dish.price} ETB
        </p>

        <AddToCartButton dish={dish} />
      </div>

      <div className="border-t pt-4 my-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Customer Notes (Server-Fetched):
        </h4>
        <ul className="text-xs text-slate-600 space-y-1">
          {reviews.map((rev, i) => (
            <li key={i}>• {rev}</li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-4">
        <Link
          href="/menu"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          ← Back to Catalog
        </Link>
      </div>
    </div>
  );
}