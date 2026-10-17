import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function KitchenPage() {
  const user = await getSession();

  if (!user) redirect("/signin?next=/kitchen");

  if (user.role !== "staff") {
    return (
      <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl max-w-md mx-auto text-center mt-6">
        <h3 className="font-bold">403 - Staff Access Only</h3>
        <p className="text-xs mt-1">Requires the staff role. Current role: {user.role}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-6 max-w-xl mx-auto shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-2">Kitchen Order System (KDS)</h2>
      <p className="text-xs text-green-700 font-semibold mb-4">Authorized: Welcome {user.name}</p>
      <div className="p-4 border rounded bg-slate-50 text-xs text-slate-600">
        Active kitchen orders ready for preparation.
      </div>
    </div>
  );
}