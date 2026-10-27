import { searchDishes } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const results = await searchDishes(query, page);
  return Response.json(results, { status: 200 });
}