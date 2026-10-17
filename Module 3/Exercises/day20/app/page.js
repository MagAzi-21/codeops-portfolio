import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Fresh Ethiopian Cuisine Delivered",
  description: "Authentic meals cooked in Bole and Kazanchis kitchens. Fast delivery across Addis Ababa paid with TeleBirr.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="py-6 space-y-6">
      <div className="bg-white border rounded-2xl p-8 shadow-sm text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Authentic Ethiopian Food Delivered</h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
          Finest traditional Gursha, sizzling Tibs, and fasting Beyaynetu prepared fresh.
        </p>
        <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden mb-6 border">
          <Image
            src="https://images.unsplash.com/photo-1544025162-d76694265947"
            alt="Ethiopian meat feast served on injera"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/menu" className="px-5 py-2.5 bg-amber-600 text-white font-bold rounded-lg text-sm hover:bg-amber-700">
            View Menu Catalog →
          </Link>
          <Link href="/search" className="px-5 py-2.5 border rounded-lg text-sm font-semibold hover:bg-slate-50">
            Search Dishes
          </Link>
        </div>
      </div>
    </div>
  );
}