"use client";

import { useEffect, useState } from "react";
import { relativeTime } from "@/lib/format";

export default function LiveStatusStream({ id, initialStatus, initialEta }) {
  const [status, setStatus] = useState(initialStatus);
  const [eta, setEta] = useState(initialEta);
  const [connectionState, setConnectionState] = useState("Connecting...");

  useEffect(() => {
    const es = new EventSource(`/api/orders/${id}/stream`);

    es.onopen = () => setConnectionState("Live");

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setStatus(data.status);
        setEta(data.etaMinutes);

        // Exercise 5: Close stream deliberately when delivered
        if (data.status === "Delivered") {
          setConnectionState("Delivered (Closed)");
          es.close();
        }
      } catch (err) {
        console.error("Failed to parse SSE payload", err);
      }
    };

    es.onerror = () => {
      setConnectionState("Disconnected / Idle");
      es.close();
    };

    // Exercise 4: Cleanup function closes EventSource to prevent connection leaks across navigation
    return () => {
      es.close();
    };
  }, [id]);

  return (
    <div className="p-4 bg-white border rounded-xl shadow-sm space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Live Order Status
          </span>
          <h3 className="text-xl font-black text-slate-800">{status}</h3>
        </div>
        <span
          className={`px-2.5 py-1 text-xs font-bold rounded-full ${
            connectionState === "Live"
              ? "bg-emerald-100 text-emerald-700 animate-pulse"
              : status === "Delivered"
              ? "bg-blue-100 text-blue-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          ● {connectionState}
        </span>
      </div>

      <div className="flex justify-between text-xs text-slate-500 border-t pt-2">
        <span>Estimated Delivery:</span>
        <strong className="text-amber-700 font-bold">
          {eta > 0 ? `${eta} mins (${relativeTime(eta)})` : "Arrived"}
        </strong>
      </div>
    </div>
  );
}