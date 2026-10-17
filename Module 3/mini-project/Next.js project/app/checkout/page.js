import { cookies } from "next/headers";
import Link from "next/link";

// Forced Dynamic Rendering: reads cookies() per-request on the server
export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("telebirr_session")?.value || "Guest Session (Unauthenticated)";

  return (
    <div className="bg-white border rounded-2xl p-6 sm:p-8 max-w-md mx-auto shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Checkout</h2>
      <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 mb-4">
        <strong>Server Dynamic SSR:</strong> Triggered on every request via <code>cookies()</code>.
      </div>

      <p className="text-xs text-slate-600 mb-6">
        Current Session ID: <code className="bg-slate-100 p-1 rounded font-mono">{sessionToken}</code>
      </p>

      <div className="space-y-3">
        <button className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition">
          Pay with TeleBirr
        </button>
        <div className="mt-4 text-center">
          <Link href="/menu" className="text-xs text-slate-500 hover:underline">
            Return to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}