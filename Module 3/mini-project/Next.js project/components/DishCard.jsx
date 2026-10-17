import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <div className="p-5 bg-white border rounded-xl hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-1">
          <Link href={`/menu/${dish.id}`} className="font-bold text-slate-900 text-lg hover:text-amber-700">
            {dish.name}
          </Link>
          {dish.spicy && (
            <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
              Spicy
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mb-2">{dish.category}</p>
        <p className="text-xs text-slate-600 line-clamp-2 mb-4">{dish.description}</p>
      </div>

      <div className="flex justify-between items-center border-t pt-3">
        <span className="text-amber-700 font-extrabold text-base">
          {dish.price} ETB
        </span>
        <AddToCartButton dish={dish} />
      </div>
    </div>
  );
}