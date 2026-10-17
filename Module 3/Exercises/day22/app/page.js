import Link from "next/link";

export default function HomePage() {
  return (
    <div className="py-8 space-y-6">
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900 mb-2">
          Maps, Real-Time SSE & Ethiopian Data Formats
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mb-6">
          Explore dynamic Leaflet loading with OpenStreetMap tiles, Server-Sent Events streams, Intl currency and date formatting, and quotation-safe CSV generation.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/track/ord_812"
            className="p-5 border rounded-xl hover:border-amber-500 transition block shadow-sm bg-slate-50"
          >
            <h3 className="font-bold text-slate-800 mb-1">Live Delivery Map Tracking →</h3>
            <p className="text-xs text-slate-500">
              Leaflet map loaded dynamically (ssr: false) with courier pins, bounds fitting, and SSE real-time updates.
            </p>
          </Link>

          <Link
            href="/orders"
            className="p-5 border rounded-xl hover:border-amber-500 transition block shadow-sm bg-slate-50"
          >
            <h3 className="font-bold text-slate-800 mb-1">Orders Report & CSV Export →</h3>
            <p className="text-xs text-slate-500">
              Formatted using <code>lib/format.js</code> with a client CSV download button handling quotes, commas, and newlines.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}