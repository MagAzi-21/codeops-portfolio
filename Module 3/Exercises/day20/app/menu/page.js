import { getDishes } from "@/lib/db";
import DishCard from "@/components/DishCard";

export const metadata = {
  title: "Menu Catalog",
  description: "Explore traditional wats, tibs, kitfo, and fasting platters.",
  alternates: { canonical: "/menu" },
};

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Addis Eats Menu Catalog</h1>
        <p className="text-xs text-slate-500">Prerendered on the server with responsive WebP image optimization.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}