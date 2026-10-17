// app/api/dishes/route.js
import { searchDishes } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const results = await searchDishes(q);
  return Response.json(results, { status: 200 });
}