import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  // Built-in Intl platform formatting with 0 KB library bundle cost
  const specialPrice = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(350);

  return (
    <div className="py-6 space-y-6">
      <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          LCP Hero Optimization
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-3 mb-2">
          Finest Ethiopian Dining
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mb-6">
          Today's Chef Special: Deluxe Gursha Combo for only <strong className="text-slate-900">{specialPrice}</strong>.
        </p>

        {/* Exercises 2 & 3: Exactly ONE hero image with priority flag to optimize LCP */}
        <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden mb-6 border">
          <Image
            src="https://images.unsplash.com/photo-1544025162-d76694265947"
            alt="Authentic traditional Ethiopian meat and injera feast platter"
            fill
            priority // Preloads file above-the-fold, bypassing lazy load to lower LCP
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        <Link
          href="/menu"
          className="px-5 py-2.5 bg-amber-600 text-white font-bold rounded-lg text-sm hover:bg-amber-700 transition inline-block"
        >
          View Optimized Menu Catalog →
        </Link>
      </div>
    </div>
  );
}