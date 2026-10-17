import { Suspense } from "react";
import Link from "next/link";
import { getDishes } from "./dishes";

// Exercise 4: Revalidate hourly (ISR)
export const revalidate = 3600;

function DishSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-28 bg-slate-200 rounded-xl"></div>
      ))}
    </div>
  );
}

async function DishList() {
  const dishes = await getDishes();

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {dishes.map((dish) => (
        <Link
          key={dish.id}
          href={`/menu/${dish.id}`}
          className="p-5 bg-white border rounded-xl hover:border-amber-500 transition block"
        >
          <h4 className="font-bold text-slate-900 mb-1">{dish.name}</h4>
          <p className="text-xs text-slate-500 mb-3">{dish.desc}</p>
          <p className="text-amber-700 font-bold">{dish.price} ETB</p>
        </Link>
      ))}
    </div>
  );
}

export default function MenuPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Exercise 4 & 7: Menu Streaming (ISR)</h2>
      {/* Exercise 7: Dish list streams inside Suspense while the sidebar remains interactive */}
      <Suspense fallback={<DishSkeleton />}>
        <DishList />
      </Suspense>
    </div>
  );
}