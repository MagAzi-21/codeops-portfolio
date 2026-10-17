import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersFor } from "@/lib/db";
import { cancelOrderAction, signOutAction } from "@/app/actions";

export default async function OrdersPage() {
  const user = await getSession();

  // Layer 2: Page-level session verification
  if (!user) {
    redirect("/signin?next=/orders");
  }

  // Scoped query: Only pulls orders belonging to user.id
  const orders = await getOrdersFor(user.id);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-4 border rounded-xl">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Your Orders</h2>
          <p className="text-xs text-slate-500">
            Signed in as: <strong className="text-slate-800">{user.name}</strong> ({user.role})
          </p>
        </div>
        <form action={signOutAction}>
          <button className="px-3 py-1 text-xs border rounded text-red-600 hover:bg-red-50">
            Sign Out
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {orders.length === 0 ? (
          <p className="text-sm text-slate-500 p-4 bg-white border rounded-xl">No active orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="p-4 bg-white border rounded-xl flex justify-between items-center shadow-sm">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">{order.id}</span>
                <h4 className="font-bold text-slate-800">{order.item}</h4>
                <p className="text-xs text-amber-700 font-semibold">{order.total} ETB • {order.status}</p>
              </div>

              {order.status === "Active" && (
                <form
                  action={async () => {
                    "use server";
                    await cancelOrderAction(order.id);
                  }}
                >
                  <button className="px-3 py-1 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700">
                    Cancel Order
                  </button>
                </form>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}