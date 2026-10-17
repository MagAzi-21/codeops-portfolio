import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <div className="p-4 border rounded bg-white shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <Link href={`/menu/${dish.id}`} className="font-semibold text-lg hover:text-amber-700">
            {dish.name}
          </Link>
          {dish.spicy && (
            <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded">
              Spicy
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mb-2">{dish.category}</p>
        <p className="text-sm font-bold text-amber-700 mb-3">{dish.price} ETB</p>
      </div>
      <AddToCartButton dish={dish} />
    </div>
  );
}