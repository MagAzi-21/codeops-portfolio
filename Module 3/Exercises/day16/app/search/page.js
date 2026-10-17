import { Suspense } from "react";
import DishSearch from "@/components/DishSearch";

export default function SearchPage() {
  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Dish Search & Pagination</h2>
        <p className="text-xs text-slate-500">Live search query deduplication and query string tracking.</p>
      </div>

      <Suspense fallback={<p className="text-center text-xs text-slate-400">Loading search...</p>}>
        <DishSearch />
      </Suspense>
    </div>
  );
}