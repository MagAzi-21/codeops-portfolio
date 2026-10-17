import Link from "next/link";
import { testOrdersForCsv } from "@/lib/db";
import { etb, when } from "@/lib/format";
import CsvExportButton from "@/components/CsvExportButton";

export default function OrdersPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Orders & Reports</h1>
          <p className="text-xs text-slate-500">
            Formatted using shared <code>lib/format.js</code> with client CSV export.
          </p>
        </div>
        <CsvExportButton data={testOrdersForCsv} filename="addis_eats_orders.csv" />
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 text-slate-700 border-b">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Dish (Escaping Test)</th>
              <th className="p-3">Area</th>
              <th className="p-3">Date (EAT)</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3 text-center">Tracking</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {testOrdersForCsv.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-bold text-slate-600">{order.id}</td>
                <td className="p-3 font-medium text-slate-900">{order.dish}</td>
                <td className="p-3 text-slate-600">{order.area}</td>
                <td className="p-3 text-slate-500">{when.format(new Date(order.date))}</td>
                <td className="p-3 text-right font-mono font-bold text-amber-700">
                  {etb.format(order.total)}
                </td>
                <td className="p-3 text-center">
                  <Link
                    href={`/track/${order.id}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Track Map →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}