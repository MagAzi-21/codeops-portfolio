import { dishes } from "./dishes";
import FilterShell from "@/components/FilterShell";
import DishList from "@/components/DishList";

export default async function MenuPage() {
  const data = dishes;

  return (
    <div>
      <h2 className="text-2xl font-bold">Menu Segment</h2>
      <FilterShell>
        <DishList dishes={data} />
      </FilterShell>
    </div>
  );
}