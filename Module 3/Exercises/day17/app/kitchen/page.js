import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function KitchenPage() {
  const user = await getSession();

  // Authentication check
  if (!user) {
    redirect("/signin?next=/kitchen");
  }

  // Exercise 7: Role authorization check on the server
  if (user.role !== "staff") {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl max-w-md mx-auto text-center mt-6">
        <h3 className="text-lg font-bold text-red-700 mb-1">403 - Forbidden Access</h3>
        <p className="text-xs text-red-600 mb-4">
          Access to the Kitchen display requires the staff role. Current role: {user.role}.
        </p>
        <Link href="/orders" className="text-xs text-blue-600 underline">
          Return to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Kitchen Order Display (KDS)</h2>
      <p className="text-xs text-green-700 font-semibold mb-6">Staff Access Granted: Welcome, {user.name}</p>
      <div className="p-4 border rounded bg-slate-50 text-sm">
        Orders queue ready for preparation.
      </div>
    </div>
  );
}