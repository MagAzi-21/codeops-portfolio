"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { validateOrder } from "@/lib/schema";
import { createOrder, getOrder, cancelOrderDb } from "@/lib/db";
import { createSessionCookie, clearSessionCookie, getSession } from "@/lib/session";

// Sign in with open redirect protection (Attack 3 Defense)
export async function signInAction(formData) {
  const userId = formData.get("userId");
  const rawNext = formData.get("next") || "/orders";

  await createSessionCookie(userId);

  // Attack 3: Open redirect defense - must start with single '/' and not '//'
  const destination = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/orders";
  redirect(destination);
}

export async function signOutAction() {
  await clearSessionCookie();
  redirect("/signin");
}

// Order placement bound to authenticated session
export async function placeOrderAction(prevState, formData) {
  const user = await getSession();
  if (!user) {
    throw new Error("401: You must be signed in to place an order");
  }

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

  const order = await createOrder({
    ...result.data,
    userId: user.id,
    customer: user.name,
  });

  revalidatePath("/menu");
  revalidatePath("/orders");
  revalidatePath("/checkout");

  return {
    success: true,
    orderId: order.id,
    fieldErrors: {},
  };
}

// Layer 3: Authorisation check at the point of mutation (Attacks 1 & 2 Defense)
export async function cancelOrder(orderId) {
  const user = await getSession();

  // Attack 1: Calling action while signed out (401)
  if (!user) {
    throw new Error("401: Unauthenticated. Session required.");
  }

  const order = await getOrder(orderId);
  if (!order) {
    throw new Error("404: Order not found");
  }

  // Attack 2: Calling action on someone else's order (403)
  if (order.userId !== user.id) {
    throw new Error("403: Forbidden. You do not own this order.");
  }

  await cancelOrderDb(orderId);
  revalidatePath("/orders");
  revalidatePath(`/orders/${orderId}`);

  return { success: true, message: `Order ${orderId} cancelled.` };
}