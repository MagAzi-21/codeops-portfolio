// app/opengraph-image.jsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#78350f",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 68, fontWeight: "bold" }}>Addis Eats</div>
        <div style={{ fontSize: 28, color: "#fef3c7", marginTop: 16 }}>Authentic Ethiopian Food Delivery</div>
      </div>
    ),
    { ...size }
  );
}