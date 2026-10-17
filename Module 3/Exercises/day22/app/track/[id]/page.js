import { notFound } from "next/navigation";
import Link from "next/link";
import { getTrackingOrder } from "@/lib/db";
import { when } from "@/lib/format";
import MapPanel from "../MapPanel";
import LiveStatusStream from "../LiveStatusStream";

export default async function TrackingPage({ params }) {
  const { id } = await params;
  const order = await getTrackingOrder(id);

  if (!order) notFound();

  return (
    <div className="space-y-6 max-w-xl mx-auto py-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Live Delivery Tracking</h1>
        <p className="text-xs text-slate-500">
          Order placed: {when.format(new Date(order.placedAt))} (Addis Ababa EAT)
        </p>
      </div>

      {/* Real-time SSE status indicator (Seeded from server data to eliminate initial spinner) */}
      <LiveStatusStream
        id={id}
        initialStatus={order.status}
        initialEta={order.etaMinutes}
      />

      {/* Dynamic Client Leaf Map */}
      <MapPanel order={order} />

      {/* Accessible Text Fallback: Essential for screen readers and users without maps */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1 text-xs text-amber-950">
        <h2 className="font-bold text-sm text-amber-900">Delivery Information (Text Overview)</h2>
        <p><strong>Customer:</strong> {order.customer}</p>
        <p><strong>Neighbourhood:</strong> {order.area}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Courier Position:</strong> Near Bole Medhanialem en route</p>
      </div>

      <div className="text-center pt-2">
        <Link href="/orders" className="text-xs text-blue-600 hover:underline">
          ← View All Orders & CSV Export
        </Link>
      </div>
    </div>
  );
}