import { cookies } from "next/headers";
import Link from "next/link";

// Exercise 6: cookies() forces the route to be dynamically rendered per request
export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_id")?.value || "Guest Session";

  return (
    <div className="bg-white p-8 border rounded-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">Order Checkout</h2>
      <p className="text-xs text-amber-700 font-semibold mb-4 bg-amber-50 p-2 rounded border border-amber-200">
        Exercise 6: Forced Dynamic via cookies().get(&quot;session_id&quot;)
      </p>
      <p className="text-slate-600 text-sm mb-4">
        Active Session: <strong className="text-slate-800">{sessionToken}</strong>
      </p>
      <button className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">
        Pay with TeleBirr
      </button>
      <div className="mt-4 text-center">
        <Link href="/menu" className="text-xs text-slate-500 hover:underline">
          Return to menu
        </Link>
      </div>
    </div>
  );
}