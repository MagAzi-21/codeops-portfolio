import { notFound } from "next/navigation";
import Link from "next/link";
import { getDish, getDishes } from "@/lib/db";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: dish.id }));
}

// Exercise 3: Dynamic metadata derived from fetched dish data
export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested dish is not available on our menu.",
    };
  }

  return {
    title: dish.name,
    description: `${dish.name}: ${dish.description} Priced at ${dish.price} ETB with fast delivery in Addis Ababa.`,
    alternates: {
      canonical: `/menu/${dish.id}`,
    },
    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description: `${dish.description} Order now for ${dish.price} ETB.`,
      type: "article",
    },
  };
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  // Exercise 5: Structured Data (Schema.org MenuItem) matching the page content exactly
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    menuAddOn: {
      "@type": "MenuItem",
      name: "Traditional Injera",
    },
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Inject JSON-LD for rich search engine result snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded">
        {dish.category}
      </span>
      <h1 className="text-3xl font-extrabold text-slate-900 mt-2 mb-2">{dish.name}</h1>
      <p className="text-slate-600 text-sm leading-relaxed mb-4">{dish.description}</p>
      <p className="text-2xl font-black text-slate-900 mb-6">{dish.price} ETB</p>

      <div className="border-t pt-4 flex justify-between items-center">
        <Link href="/menu" className="text-sm font-semibold text-blue-600 hover:underline">
          ← Back to Catalog
        </Link>
        <Link
          href="/cart"
          className="px-4 py-2 bg-amber-600 text-white text-sm font-bold rounded-lg hover:bg-amber-700"
        >
          Add to Order
        </Link>
      </div>
    </div>
  );
}