"use client";

import { useState } from "react";
import Link from "next/link";

export default function MenuLayout({ children }) {
  // Exercise 3: State counter that persists across navigation to /menu/[id]
  const [persistedCounter, setPersistedCounter] = useState(0);

  return (
    <div className="grid md:grid-cols-4 gap-8">
      <aside className="md:col-span-1 bg-white p-5 border rounded-xl h-fit space-y-6">
        <div>
          <h3 className="font-bold text-slate-900 mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/menu" className="text-amber-700 font-semibold block hover:underline">
                All Dishes
              </Link>
            </li>
            <li>
              <Link href="/menu" className="text-slate-600 block hover:text-slate-900">
                Main
              </Link>
            </li>
            <li>
              <Link href="/menu" className="text-slate-600 block hover:text-slate-900">
                Vegan
              </Link>
            </li>
          </ul>
        </div>

        <div className="border-t pt-4">
          <p className="text-xs text-slate-500 mb-2 font-medium">Exercise 3: State Persistence</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Count: {persistedCounter}</span>
            <button
              onClick={() => setPersistedCounter((c) => c + 1)}
              className="px-2.5 py-1 text-xs bg-slate-100 border rounded hover:bg-slate-200"
            >
              + Increment
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Increment count, then click a dish. Notice the count does not reset!
          </p>
        </div>
      </aside>

      <section className="md:col-span-3">{children}</section>
    </div>
  );
}