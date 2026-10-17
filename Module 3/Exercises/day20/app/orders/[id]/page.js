import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrder } from "@/lib/db";
import { cancelOrder, signOutAction } from "@/app/actions";
import OrderStatus from "@/components/OrderStatus";

export default async function OrderDetailPage({ params }) {
  const user = await getSession();

  // Layer 2: Page level session check
  if (!user) {
    redirect(`/signin?next=/orders/${(await params).id}`);
  }

  const { id } = await params;
  const initialOrder = await getOrder(id);

  if (!initialOrder) notFound();

  // Scoped Ownership Check: Cannot view an order belonging to another user
  if (initialOrder.userId !== user.id) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl max-w-md mx-auto text-center mt-6">
        <h3 className="font-bold">403 - Forbidden Access</h3>
        <p className="text-xs mt-1">This order belongs to another account.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex justify-between items-center bg-white p-4 border rounded-xl shadow-sm">
        <span className="text-xs text-slate-500">Signed in as: <strong>{user.name}</strong></span>
        <form action={signOutAction}>
          <button className="text-xs text-red-600 underline">Sign Out</button>
        </form>
      </div>

      {/* SWR seeded with initialOrder server data (0 spinner on arrival) */}
      <OrderStatus id={id} initialOrder={initialOrder} />

      {initialOrder.status !== "Cancelled" && (
        <form
          action={async () => {
            "use server";
            await cancelOrder(id);
          }}
        >
          <button className="w-full py-2 bg-red-600 text-white font-bold text-xs rounded-lg hover:bg-red-700 transition">
            Cancel Order (Trigger Layer 3 Ownership Check)
          </button>
        </form>
      )}
    </div>
  );
}