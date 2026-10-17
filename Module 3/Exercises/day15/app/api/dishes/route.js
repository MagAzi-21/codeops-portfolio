import { getDishes } from "@/lib/db";

export async function GET() {
  const dishes = await getDishes();
  return Response.json(dishes, { status: 200 });
}