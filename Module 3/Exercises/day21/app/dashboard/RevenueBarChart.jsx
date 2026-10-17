"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { formatETB } from "@/lib/formatters";

export default function RevenueBarChart({ data }) {
  return (
    // Fixed container height prevents layout shift during client hydration
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis dataKey="area" tickLine={false} tick={{ fill: "#475569", fontSize: 12 }} />
          {/* Honest scale: Starts at 0 */}
          <YAxis
            tickFormatter={formatETB}
            domain={[0, "auto"]}
            width={85}
            tickLine={false}
            tick={{ fill: "#475569", fontSize: 11 }}
          />
          <Tooltip
            formatter={(value) => [formatETB(value), "Revenue"]}
            contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E2E8F0" }}
          />
          <Bar dataKey="revenue" fill="#B45309" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}