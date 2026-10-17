import { dishes } from "@/lib/db";
import FilterShell from "@/components/FilterShell";
import DishList from "@/components/DishList";

// Incremental Static Regeneration: hourly revalidation
export const revalidate = 3600;

export default async function MenuPage() {
  const menuData = dishes;

  return (
    <div>
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-slate-900">Menu Catalog</h2>
        <p className="text-xs text-slate-500">Server Component reading directly from data layer.</p>
      </div>

      <FilterShell>
        <DishList dishes={menuData} />
      </FilterShell>
    </div>
  );
}