import Image from "next/image";

export default function DishCard({ dish }) {
  // Format ETB currency natively
  const formattedPrice = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(dish.price);

  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
      {/* Exercise 2: width and height reserve aspect ratio to eliminate Cumulative Layout Shift (CLS) */}
      <div className="relative w-full h-48 bg-slate-100">
        <Image
          src={dish.imageUrl}
          alt={dish.altText} // Meaningful alt text for accessibility and screen readers
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy" // Lazy load all cards below fold
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-slate-800 text-base">{dish.name}</h3>
            {dish.spicy && (
              <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                Spicy
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mb-4">{dish.description}</p>
        </div>

        <div className="flex justify-between items-center border-t pt-3">
          <span className="font-extrabold text-amber-700 text-sm">{formattedPrice}</span>
          <button className="px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded hover:bg-amber-700">
            Order
          </button>
        </div>
      </div>
    </div>
  );
}