import { notFound } from "next/navigation";
import Link from "next/link";
import { dishes, getDish } from "@/lib/db";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateStaticParams() {
  return dishes.map((dish) => ({
    id: dish.id,
  }));
}

// Dynamic metadata derived from fetched dish data
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

async function getReviews(id) {
  return [
    `Fresh and traditional preparation for ${id}.`,
    "Rich seasoning and authentic injera.",
  ];
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const [dish, reviews] = await Promise.all([getDish(id), getReviews(id)]);

  if (!dish) {
    notFound();
  }

  // Schema.org structured data matching rendered content exactly
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-4">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded">
          {dish.category}
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-2 mb-2">
          {dish.name}
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {dish.description}
        </p>
        <p className="text-2xl font-black text-slate-900 mb-6">
          {dish.price} ETB
        </p>

        <AddToCartButton dish={dish} />
      </div>

      <div className="border-t pt-4 my-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Customer Notes:
        </h2>
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