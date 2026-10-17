import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {dishes.map((dish) => (
        <Link
          key={dish.id}
          href={`/menu/${dish.id}`}
          className="p-5 bg-white border rounded-xl hover:border-amber-500 hover:shadow-md transition block flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-slate-900 text-lg">{dish.name}</h3>
              {dish.spicy && (
                <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                  Spicy
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 mb-4">
              {dish.description}
            </p>
          </div>
          <div className="flex justify-between items-center border-t pt-3">
            <span className="text-amber-700 font-extrabold text-base">
              {dish.price} ETB
            </span>
            <span className="text-xs font-semibold text-blue-600 hover:underline">
              View Details →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}