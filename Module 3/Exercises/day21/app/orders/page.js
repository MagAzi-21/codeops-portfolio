import Link from "next/link";
import { getPaginatedOrders } from "@/lib/db";
import OrderTable from "@/components/OrderTable";
import Pager from "@/components/Pager";

export default async function OrdersPage({ searchParams }) {
  const params = await searchParams;
  const sort = params?.sort || "date";
  const dir = params?.dir || "desc";
  const page = parseInt(params?.page || "1", 10);
  const showEmpty = params?.empty === "true"; // Demonstration flag for Empty State

  // Server fetch reading searchParams directly from URL
  const { rows, totalPages } = await getPaginatedOrders({
    sort,
    dir,
    page,
    limit: 4,
    empty: showEmpty,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Order History</h1>
          <p className="text-xs text-slate-500">Accessible tabular representation with URL-persisted sorting and paging.</p>
        </div>
        <div className="flex gap-2">
          {showEmpty ? (
            <Link href="/orders" className="px-2.5 py-1 text-xs border rounded bg-white text-blue-600 font-semibold">
              Show Loaded State
            </Link>
          ) : (
            <Link href="/orders?empty=true" className="px-2.5 py-1 text-xs border rounded bg-white text-slate-600 font-semibold">
              Force Empty State
            </Link>
          )}
        </div>
      </div>

      {/* State 2: Honest Empty State */}
      {rows.length === 0 ? (
        <div className="p-10 border rounded-2xl bg-white text-center shadow-sm space-y-3">
          <span className="text-3xl">🍲</span>
          <h3 className="font-bold text-slate-800 text-lg">No orders yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You have not placed any orders yet. Browse our traditional menu to enjoy fresh wats and kitfo delivered hot!
          </p>
          <Link
            href="/"
            className="inline-block mt-2 px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700"
          >
            Explore Menu & Place Order →
          </Link>
        </div>
      ) : (
        /* State 4: Loaded State */
        <div className="space-y-4">
          <OrderTable rows={rows} sort={sort} dir={dir} page={page} />
          <Pager page={page} totalPages={totalPages} sort={sort} dir={dir} />
        </div>
      )}
    </div>
  );
}