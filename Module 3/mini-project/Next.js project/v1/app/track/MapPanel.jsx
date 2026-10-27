"use client";

import dynamic from "next/dynamic";

// Leaflet touches window on import; ssr: false prevents build and server crashes[cite: 53]
const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false, // The critical line[cite: 53]
  // Placeholder exactly matches map height (320px) to prevent layout shifts (CLS)[cite: 53]
  loading: () => (
    <div className="h-[320px] w-full bg-slate-100 border rounded-xl flex items-center justify-center text-slate-400 text-xs animate-pulse">
      Loading OpenStreetMap Delivery Canvas...
    </div>
  ),
});

export default function MapPanel({ order }) {
  return <DeliveryMap order={order} />;
}