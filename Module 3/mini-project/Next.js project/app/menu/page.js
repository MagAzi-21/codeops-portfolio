import { dishes } from "./dishes";
import FilterShell from "@/components/FilterShell";
import DishList from "@/components/DishList";

export const revalidate = 3600;

export default async function MenuPage() {
  // Direct server await replaces useState, useEffect, and /api waterfalls
  const data = dishes;

  return (
    <div>
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-slate-900">Addis Eats Menu</h2>
        <p className="text-xs text-slate-500">Composed using React Server Components and interactive client leaves.</p>
      </div>

      <FilterShell>
        <DishList dishes={data} />
      </FilterShell>
    </div>
  );
}