// app/menu/[id]/opengraph-image.jsx
import { ImageResponse } from "next/og";
import { getDish } from "@/lib/db";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };

export default async function Image({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1c1917",
          color: "#ffffff",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: "bold", color: "#d97706" }}>Addis Eats</div>
        <div style={{ fontSize: 64, fontWeight: "900" }}>{dish?.name || "Dish Preview"}</div>
        <div style={{ fontSize: 32, color: "#f59e0b" }}>{dish?.price || 0} ETB • Delivered Across Addis</div>
      </div>
    ),
    { ...size }
  );
}