"use client";

import { useState } from "react";
import Link from "next/link";

export default function MenuLayout({ children }) {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="grid md:grid-cols-4 gap-8">
      <aside className="md:col-span-1 bg-white p-5 border rounded-2xl h-fit shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-slate-900 mb-3 text-sm tracking-wide uppercase">
            Menu Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/menu" className="text-amber-700 font-bold block hover:underline">
                All Items
              </Link>
            </li>
            <li>
              <Link href="/menu" className="text-slate-600 block hover:text-slate-900">
                Stews & Wats
              </Link>
            </li>
            <li>
              <Link href="/menu" className="text-slate-600 block hover:text-slate-900">
                Fasting & Vegan
              </Link>
            </li>
          </ul>
        </div>

        <div className="border-t pt-4">
          <p className="text-xs text-slate-500 mb-1 font-medium">Layout State Check:</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-800">Count: {clickCount}</span>
            <button
              onClick={() => setClickCount((c) => c + 1)}
              className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 border rounded font-semibold"
            >
              + Click
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            State remains unchanged when navigating to detail pages.
          </p>
        </div>
      </aside>

      <section className="md:col-span-3">{children}</section>
    </div>
  );
}