"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { formatDate } from "@/lib/formatters";

export default function OrdersLineChart({ data }) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tickLine={false}
            tick={{ fill: "#475569", fontSize: 12 }}
          />
          <YAxis
            allowDecimals={false}
            domain={[0, "auto"]}
            width={40}
            tickLine={false}
            tick={{ fill: "#475569", fontSize: 12 }}
          />
          <Tooltip
            labelFormatter={formatDate}
            formatter={(val) => [`${val} Orders`, "Daily Volume"]}
            contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E2E8F0" }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#1D4ED8"
            strokeWidth={3}
            dot={{ r: 4, fill: "#1D4ED8" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}