import Link from "next/link";
import { formatETB } from "@/lib/formatters";

export default function OrderTable({ rows, sort, dir, page }) {
  function getSortUrl(columnKey) {
    const nextDir = sort === columnKey && dir === "asc" ? "desc" : "asc";
    return `/orders?sort=${columnKey}&dir=${nextDir}&page=${page}`;
  }

  function getAriaSort(columnKey) {
    if (sort !== columnKey) return "none";
    return dir === "asc" ? "ascending" : "descending";
  }

  return (
    <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <caption className="p-3 text-xs text-slate-500 font-medium text-left border-b bg-slate-50">
          Customer Orders Log (Most recent and sorted by preference)
        </caption>
        <thead className="bg-slate-100 text-xs font-semibold text-slate-700 uppercase tracking-wider">
          <tr>
            <th scope="col" aria-sort={getAriaSort("id")} className="py-3 px-4">
              <Link href={getSortUrl("id")} className="flex items-center gap-1 hover:text-amber-700">
                Order ID {sort === "id" && (dir === "asc" ? "↑" : "↓")}
              </Link>
            </th>
            <th scope="col" aria-sort={getAriaSort("date")} className="py-3 px-4">
              <Link href={getSortUrl("date")} className="flex items-center gap-1 hover:text-amber-700">
                Date {sort === "date" && (dir === "asc" ? "↑" : "↓")}
              </Link>
            </th>
            <th scope="col" className="py-3 px-4">Area</th>
            <th scope="col" className="py-3 px-4">Dish Item</th>
            <th scope="col" aria-sort={getAriaSort("total")} className="py-3 px-4 text-right">
              <Link href={getSortUrl("total")} className="flex items-center justify-end gap-1 hover:text-amber-700">
                Total (ETB) {sort === "total" && (dir === "asc" ? "↑" : "↓")}
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-normal">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50 transition">
              <td className="py-3 px-4 font-mono text-xs font-semibold text-slate-600">{row.id}</td>
              <td className="py-3 px-4 text-slate-600">{row.date}</td>
              <td className="py-3 px-4 text-slate-800">{row.area}</td>
              <td className="py-3 px-4 text-slate-900 font-medium">{row.item}</td>
              {/* Numbers right-aligned with tabular numbers for vertical alignment */}
              <td className="py-3 px-4 text-right font-mono font-bold text-amber-700">
                {formatETB(row.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}