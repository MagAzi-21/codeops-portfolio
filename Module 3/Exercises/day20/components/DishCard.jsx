import Image from "next/image";
import Link from "next/link";

export default function DishCard({ dish }) {
  const formattedPrice = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(dish.price);

  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
      <div className="relative w-full h-48 bg-slate-100">
        <Image
          src={dish.imageUrl}
          alt={`Authentic preparation of ${dish.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <Link href={`/menu/${dish.id}`} className="font-bold text-slate-800 text-base hover:text-amber-700">
              {dish.name}
            </Link>
            {dish.spicy && (
              <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                Spicy
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mb-3">{dish.description}</p>
        </div>

        <div className="flex justify-between items-center border-t pt-3">
          <span className="font-extrabold text-amber-700 text-sm">{formattedPrice}</span>
          <Link href={`/menu/${dish.id}`} className="px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded hover:bg-amber-700">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}