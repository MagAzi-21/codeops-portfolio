import { getDashboardMetrics } from "@/lib/db";
import { formatETB } from "@/lib/formatters";
import RevenueBarChart from "./RevenueBarChart";
import OrdersLineChart from "./OrdersLineChart";

export const metadata = {
  title: "Analytics Dashboard",
  description: "Revenue by neighbourhood and orders over time.",
};

export default async function DashboardPage() {
  // Server-side aggregation: summarizes orders into compact arrays
  const { byArea, byDate } = await getDashboardMetrics();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Addis Eats Restaurant Analytics</h1>
        <p className="text-xs text-slate-500 mt-1">
          Server-aggregated metrics: Revenue distribution and weekly order trends.
        </p>
      </div>

      {/* Chart 1: Revenue by Area */}
      <section className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">Revenue by Neighbourhood</h2>
          <p className="text-xs text-slate-400">Total gross receipts in ETB (Axis zero-based)</p>
        </div>
        <RevenueBarChart data={byArea} />

        {/* Exercise 4: Dual representation table beneath chart for accessibility */}
        <details className="mt-4 pt-3 border-t">
          <summary className="text-xs font-semibold text-blue-600 cursor-pointer">
            View as accessible table data
          </summary>
          <table className="w-full text-xs mt-2 border">
            <caption className="sr-only">Revenue breakdown by delivery area</caption>
            <thead className="bg-slate-50">
              <tr>
                <th className="p-2 text-left">Area</th>
                <th className="p-2 text-right">Revenue (ETB)</th>
                <th className="p-2 text-right">Volume</th>
              </tr>
            </thead>
            <tbody>
              {byArea.map((row) => (
                <tr key={row.area} className="border-t">
                  <td className="p-2">{row.area}</td>
                  <td className="p-2 text-right font-mono">{formatETB(row.revenue)}</td>
                  <td className="p-2 text-right font-mono">{row.orderCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </section>

      {/* Chart 2: Orders Trend Line */}
      <section className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">Orders Over Time</h2>
          <p className="text-xs text-slate-400">Daily delivery volume: Oct 10 - Oct 15, 2026 (Unit: Orders)</p>
        </div>
        <OrdersLineChart data={byDate} />

        <details className="mt-4 pt-3 border-t">
          <summary className="text-xs font-semibold text-blue-600 cursor-pointer">
            View as accessible table data
          </summary>
          <table className="w-full text-xs mt-2 border">
            <caption className="sr-only">Orders per day timeline</caption>
            <thead className="bg-slate-50">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-right">Order Count</th>
              </tr>
            </thead>
            <tbody>
              {byDate.map((row) => (
                <tr key={row.date} className="border-t">
                  <td className="p-2">{row.date}</td>
                  <td className="p-2 text-right font-mono">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </section>
    </div>
  );
}