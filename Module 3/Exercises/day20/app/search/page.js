import { Suspense } from "react";
import DishSearch from "@/components/DishSearch";

export const metadata = {
  title: "Search Dishes",
  description: "Debounced live dish search.",
};

export default function SearchPage() {
  return (
    <div className="py-6">
      <Suspense fallback={<p className="text-center text-xs">Loading search...</p>}>
        <DishSearch />
      </Suspense>
    </div>
  );
}