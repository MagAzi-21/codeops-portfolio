"use server";

import { revalidatePath } from "next/cache";
import { validateOrder } from "@/lib/schema";
import { createOrder, getOrder, cancelOrderDb, getSession } from "@/lib/db";

// Exercise 5 & 6: Server Action replacing client fetch with cache revalidation
export async function placeOrderAction(prevState, formData) {
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    dishId: formData.get("dishId"),
  };

  const result = validateOrder(rawData);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.errors,
    };
  }

  const order = await createOrder(result.data);

  // Exercise 6: Revalidate cache after successful mutation
  revalidatePath("/menu");
  revalidatePath("/checkout");

  return {
    success: true,
    orderId: order.id,
    fieldErrors: {},
  };
}

// Exercise 7: Authorization inside the action — checking session and record ownership
export async function cancelOrderAction(orderId) {
  const user = await getSession();
  if (!user) {
    throw new Error("401: Not signed in");
  }

  const order = await getOrder(orderId);
  if (!order) {
    throw new Error("404: Order not found");
  }

  if (order.userId !== user.id) {
    throw new Error("403: Not authorized to cancel this order");
  }

  await cancelOrderDb(orderId);
  revalidatePath("/checkout");

  return { success: true, message: "Order cancelled successfully" };
}