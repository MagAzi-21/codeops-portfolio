import { notFound } from "next/navigation";
import Link from "next/link";
import { getDish, getDishes } from "@/lib/db";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) return { title: "Dish Not Found" };

  return {
    title: dish.name,
    description: `${dish.name}: ${dish.description} ${dish.price} ETB delivered hot.`,
    alternates: { canonical: `/menu/${dish.id}` },
    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description: dish.description,
    },
  };
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
    },
  };

  return (
    <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <span className="text-xs font-bold text-amber-700 uppercase bg-amber-50 px-2.5 py-1 rounded">
        {dish.category}
      </span>
      <h1 className="text-3xl font-black text-slate-900 mt-2 mb-2">{dish.name}</h1>
      <p className="text-slate-600 text-sm mb-4">{dish.description}</p>
      <p className="text-2xl font-black text-slate-900 mb-6">{dish.price} ETB</p>
      <div className="border-t pt-4">
        <Link href="/menu" className="text-sm font-semibold text-blue-600 hover:underline">
          ← Back to Catalog
        </Link>
      </div>
    </div>
  );
}