import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { getPaginatedOrdersForUser, getOrdersFor } from "@/lib/db";
import { signOutAction } from "@/app/actions";
import OrderTable from "@/components/OrderTable";
import Pager from "@/components/Pager";
import CsvExportButton from "@/components/CsvExportButton";

export default async function OrdersPage({ searchParams }) {
  const user = await getSession();

  // Layer 2 session guard[cite: 42]
  if (!user) {
    redirect("/signin?next=/orders");
  }

  const params = await searchParams;
  const sort = params?.sort || "date";
  const dir = params?.dir || "desc";
  const page = parseInt(params?.page || "1", 10);
  const showEmpty = params?.empty === "true";

  const { rows, totalPages } = await getPaginatedOrdersForUser(user.id, {
    sort,
    dir,
    page,
    limit: 4,
    empty: showEmpty,
  });

  const allUserOrders = await getOrdersFor(user.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 border rounded-xl shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Your Orders Log</h1>
          <p className="text-xs text-slate-500">
            Signed in as: <strong className="text-slate-800">{user.name}</strong> ({user.role})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CsvExportButton data={allUserOrders} filename={`addis_eats_${user.id}_orders.csv`} />
          <form action={signOutAction}>
            <button className="px-3 py-1 text-xs border rounded text-red-600 hover:bg-red-50">
              Sign Out
            </button>
          </form>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="p-10 border rounded-2xl bg-white text-center shadow-sm space-y-3">
          <span className="text-4xl">🍲</span>
          <h3 className="font-bold text-slate-800 text-lg">No orders found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You do not have any orders recorded yet. Explore our authentic Ethiopian menu to place your first order!
          </p>
          <Link
            href="/menu"
            className="inline-block mt-2 px-5 py-2.5 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 transition"
          >
            Explore Menu & Place Order →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <OrderTable rows={rows} sort={sort} dir={dir} page={page} />
          <Pager page={page} totalPages={totalPages} sort={sort} dir={dir} />
        </div>
      )}
    </div>
  );
}