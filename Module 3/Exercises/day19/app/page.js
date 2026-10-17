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
  return (
    <div className="py-8 space-y-6">
      <div className="bg-white border rounded-2xl p-8 shadow-sm text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
          Authentic Ethiopian Cuisine Delivered
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mx-auto mb-6">
          Fresh injera, simmering wats, and sizzling grilled meats prepared with authentic spices and delivered hot to your door in Addis Ababa.
        </p>
        <Link
          href="/menu"
          className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition inline-block text-sm"
        >
          Explore Our Menu Catalog →
        </Link>
      </div>
    </div>
  );
}