import { dishes } from "@/lib/db";
import FilterShell from "@/components/FilterShell";
import DishList from "@/components/DishList";

export const revalidate = 3600;

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
  const data = dishes;

  return (
    <div>
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-slate-900">Addis Eats Menu Catalog</h1>
        <p className="text-xs text-slate-500">Composed using React Server Components and interactive client leaves.</p>
      </div>

      <FilterShell>
        <DishList dishes={data} />
      </FilterShell>
    </div>
  );
}