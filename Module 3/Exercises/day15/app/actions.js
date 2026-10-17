"use server";

import { revalidatePath } from "next/cache";
import { validateOrder } from "@/lib/schema";
import { createOrder, getOrder, cancelOrderDb, getSession } from "@/lib/db";

export async function placeOrderAction(prevState, formData) {
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    dishId: formData.get("dishId"),
  };

  const validation = validateOrder(rawData);

  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.errors,
    };
  }

  const order = await createOrder(validation.data);

  // Invalidate cached menu and checkout segments
  revalidatePath("/menu");
  revalidatePath("/checkout");

  return {
    success: true,
    orderId: order.id,
    fieldErrors: {},
  };
}

export async function cancelOrderAction(orderId) {
  const user = await getSession();
  if (!user) {
    throw new Error("401: Not signed in");
  }

  const order = await getOrder(orderId);
  if (!order) {
    throw new Error("404: Order not found");
  }

  // Security: record owner verification inside action
  if (order.userId !== user.id) {
    throw new Error("403: Not authorized to cancel this order");
  }

  await cancelOrderDb(orderId);
  revalidatePath("/checkout");

  return { success: true, message: "Order cancelled successfully" };
}