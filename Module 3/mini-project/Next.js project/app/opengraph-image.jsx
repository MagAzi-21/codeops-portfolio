import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Addis Eats - Authentic Ethiopian Food Delivery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "40px",
        }}
      >
        <div
          style={{
            fontSize: 32,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#fde68a",
            marginBottom: 16,
            fontWeight: "bold",
          }}
        >
          Addis Ababa Food Delivery
        </div>
        <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 20 }}>
          Addis Eats
        </div>
        <div style={{ fontSize: 28, color: "#fef3c7", maxWidth: 900, textAlign: "center" }}>
          Authentic Kitfo, Doro Wat, and Vegan Fasting Platters delivered hot to your door.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}