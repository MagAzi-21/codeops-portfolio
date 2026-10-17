import { validateOrder } from "@/lib/schema";
import { createOrder } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = validateOrder(body);

    if (!result.success) {
      return Response.json(
        {
          error: "Validation failed",
          fieldErrors: result.errors,
        },
        { status: 422 }
      );
    }

    const order = await createOrder(result.data);
    return Response.json(order, { status: 201 });
  } catch (err) {
    return Response.json(
      {
        error: "Malformed request",
        message: err.message,
      },
      { status: 400 }
    );
  }
}