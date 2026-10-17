import Link from "next/link";
import { dishes } from "@/lib/db";
import DishCardAccessible from "@/components/DishCardAccessible";

export default function HomePage() {
  return (
    <div className="py-6 space-y-6">
      <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 mb-2">
          Keyboard, Touch & Event Architecture
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mb-6">
          Testing accessible button semantics, modal Escape key dismissals, focus preservation, and 44px mobile touch targets.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {dishes.map((dish) => (
            <DishCardAccessible key={dish.id} dish={dish} />
          ))}
        </div>

        <div className="border-t pt-4 text-center">
          <Link
            href="/checkout"
            className="touch-target inline-flex items-center px-6 py-2.5 bg-amber-600 text-white font-bold text-sm rounded-xl hover:bg-amber-700"
          >
            Go to Accessible Checkout Form →
          </Link>
        </div>
      </div>
    </div>
  );
}