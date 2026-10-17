import { notFound } from "next/navigation";
import Link from "next/link";
import { getDishes, getDish } from "../dishes";

// Exercise 5: Generates static HTML for every dish at build time
export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({
    id: dish.id,
  }));
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  return (
    <div className="bg-white p-8 border rounded-xl">
      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
        {dish.category}
      </span>
      <h2 className="text-3xl font-bold mt-1 mb-2">{dish.name}</h2>
      <p className="text-slate-600 mb-6">{dish.desc}</p>
      <div className="flex justify-between items-center border-t pt-4">
        <span className="text-2xl font-bold text-slate-900">{dish.price} ETB</span>
        <Link href="/menu" className="text-sm font-semibold text-blue-600 hover:underline">
          ← Back to Catalog
        </Link>
      </div>
    </div>
  );
}