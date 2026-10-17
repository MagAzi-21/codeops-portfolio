import { notFound } from "next/navigation";
import Link from "next/link";
import { getDishes, getDish } from "@/lib/db";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateStaticParams() {
  const allDishes = await getDishes();
  return allDishes.map((dish) => ({
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
    <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">
      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded">
        {dish.category}
      </span>
      <h2 className="text-3xl font-extrabold text-slate-900 mt-2 mb-2">{dish.name}</h2>
      <p className="text-slate-600 text-sm leading-relaxed mb-4">{dish.description}</p>
      <p className="text-2xl font-black text-slate-900 mb-6">{dish.price} ETB</p>

      <AddToCartButton dish={dish} />

      <div className="border-t pt-6 mt-6">
        <Link href="/menu" className="text-sm font-semibold text-blue-600 hover:underline">
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
}