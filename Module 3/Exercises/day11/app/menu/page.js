import Link from "next/link";
import { dishes } from "./dishes";
import CategoryBar from "./CategoryBar";

export default function MenuPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Our Menu</h2>
      <CategoryBar />
      <div className="flex flex-col gap-3 mt-4">
        {dishes.map((dish) => (
          <Link
            key={dish.id}
            href={`/menu/${dish.id}`}
            className="p-4 border rounded hover:border-amber-500 transition block"
          >
            <h3 className="font-semibold text-lg">{dish.name}</h3>
            <p className="text-gray-600">{dish.price} ETB</p>
          </Link>
        ))}
      </div>
    </div>
  );
}