import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Authentic Ethiopian Dishes Delivered Fast",
  description:
    "Order Doro Wat, Tibs, and Kitfo prepared from kitchens in Bole and Kazanchis. Fast delivery across Addis Ababa paid securely with TeleBirr.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const promoPrice = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(260);

  return (
    <div className="py-6 space-y-6">
      <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm text-center">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          LCP Hero Optimization
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-4 mb-2">
          Finest Authentic Ethiopian Dining
        </h1>
        <p className="text-slate-600 max-w-lg mx-auto mb-6 text-sm sm:text-base">
          Today's Chef Special: Traditional Doro Wat Combo for only <strong className="text-slate-900">{promoPrice}</strong>.
        </p>

        <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden mb-6 border shadow-inner">
          <Image
            src="https://images.unsplash.com/photo-1544025162-d76694265947"
            alt="Authentic traditional Ethiopian meat and injera feast platter"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/menu"
            className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition inline-block text-sm"
          >
            Explore Full Menu →
          </Link>
          <Link
            href="/search"
            className="px-6 py-3 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition inline-block"
          >
            Search Dishes
          </Link>
        </div>
      </div>
    </div>
  );
}