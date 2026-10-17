"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSessionCookie, clearSessionCookie, getSession } from "@/lib/session";
import { getOrder, cancelOrderDb } from "@/lib/db";

export async function signInAction(formData) {
  const userId = formData.get("userId");
  const rawNext = formData.get("next") || "/orders/ord_812";

  await createSessionCookie(userId);

  // Open Redirect Defense: strictly enforce leading single slash
  const dest = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/orders/ord_812";
  redirect(dest);
}

export async function signOutAction() {
  await clearSessionCookie();
  redirect("/signin");
}

// Layer 3: Enforces authentication and record ownership at point of effect
export async function cancelOrder(orderId) {
  const user = await getSession();

  // Attack 1: Signed-out call
  if (!user) {
    throw new Error("401: Unauthenticated. Session required.");
  }

  const order = await getOrder(orderId);
  if (!order) {
    throw new Error("404: Order not found.");
  }

  // Attack 2: Signed in as someone else
  if (order.userId !== user.id) {
    throw new Error("403: Forbidden. You do not own this order.");
  }

  await cancelOrderDb(orderId);
  revalidatePath(`/orders/${orderId}`);
  return { success: true, message: `Order ${orderId} cancelled.` };
}