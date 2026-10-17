import { ImageResponse } from "next/og";
import { getDish } from "@/lib/db";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  const title = dish ? dish.name : "Addis Eats Dish";
  const price = dish ? `${dish.price} ETB` : "Authentic Ethiopian";
  const category = dish ? dish.category : "Food Delivery";

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
          color: "#fafaf9",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 32, fontWeight: "bold", color: "#d97706" }}>
            Addis Eats
          </div>
          <div
            style={{
              fontSize: 24,
              backgroundColor: "#292524",
              padding: "8px 20px",
              borderRadius: "999px",
              color: "#a8a29e",
            }}
          >
            {category}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 900, marginBottom: 12 }}>
            {title}
          </div>
          <div style={{ fontSize: 32, color: "#f59e0b", fontWeight: "bold" }}>
            {price} • Served with Fresh Injera
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#78716c", borderTop: "2px solid #292524", paddingTop: 20 }}>
          Order online across Addis Ababa • TeleBirr Accepted
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}