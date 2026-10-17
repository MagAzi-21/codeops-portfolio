"use client";

import dynamic from "next/dynamic";

// Exercise 1: Leaflet accesses `window` on import; ssr: false prevents build and server crashes
const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  // Sized placeholder matches map's 320px height exactly to prevent layout shifts (CLS)
  loading: () => (
    <div className="h-[320px] w-full bg-slate-100 border rounded-xl flex items-center justify-center text-slate-400 text-xs animate-pulse">
      Loading OpenStreetMap Leaflet Canvas...
    </div>
  ),
});

export default function MapPanel({ order }) {
  return <DeliveryMap order={order} />;
}