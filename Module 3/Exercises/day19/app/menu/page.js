import Link from "next/link";
import { getDishes } from "@/lib/db";

// Canonical URL aggregates query parameters like /menu?category=all into the single authoritative /menu URL
export const metadata = {
  title: "Menu Catalog",
  description:
    "Browse our full Ethiopian menu: Special Kitfo, spicy Doro Wat, Shiro Tegamino, and Sizzling Tibs with fresh injera.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Menu Catalog | Addis Eats",
    description: "Traditional Ethiopian main dishes and fasting specials ready for delivery.",
  },
};

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Addis Eats Menu Catalog</h1>
        <p className="text-xs text-slate-500">Select any dish to view ingredients, pricing, and dietary details.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {dishes.map((dish) => (
          <Link
            key={dish.id}
            href={`/menu/${dish.id}`}
            className="p-5 bg-white border rounded-xl hover:border-amber-500 hover:shadow-md transition block flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-1">
                <h2 className="font-bold text-slate-900 text-base">{dish.name}</h2>
                {dish.spicy && (
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    Spicy
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3">{dish.description}</p>
            </div>
            <div className="border-t pt-2 flex justify-between items-center text-sm">
              <span className="font-extrabold text-amber-700">{dish.price} ETB</span>
              <span className="text-xs text-blue-600 font-semibold">View Details →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}