import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function CheckoutPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/checkout");

  return (
    <div className="p-6 bg-white border rounded-xl max-w-md mx-auto text-center">
      <h2 className="text-xl font-bold mb-2">Checkout</h2>
      <p className="text-xs text-slate-500">Authenticated user: {user.name}</p>
    </div>
  );
}