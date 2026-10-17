import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function CheckoutPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/checkout");
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-xl shadow-sm text-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Guarded Checkout</h2>
      <p className="text-xs text-slate-500 mb-4">
        Authenticated as {user.name}. Ready for TeleBirr payment processing.
      </p>
      <Link href="/orders" className="text-xs text-blue-600 underline">
        View Order History →
      </Link>
    </div>
  );
}