"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSessionCookie, clearSessionCookie, getSession } from "@/lib/session";
import { getOrder, cancelOrderDb } from "@/lib/db";

// Exercises 2, 4 & 5: Sign in with safe open-redirect prevention
export async function signInAction(formData) {
  const userId = formData.get("userId");
  const rawNext = formData.get("next") || "/orders";

  await createSessionCookie(userId);

  // Exercise 5: Prevent Open Redirects — strictly enforce relative root URL
  const destination = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/orders";

  redirect(destination);
}

export async function signOutAction() {
  await clearSessionCookie();
  redirect("/signin");
}

// Exercises 6 & 7: Check authentication, ownership, and authorization inside the action
export async function cancelOrderAction(orderId) {
  const user = await getSession();

  // Authentication check (401)
  if (!user) {
    throw new Error("401: Authentication required. Please sign in.");
  }

  const order = await getOrder(orderId);
  if (!order) {
    throw new Error("404: Order not found.");
  }

  // Authorisation check (403): Cannot touch someone else's order
  if (order.userId !== user.id) {
    throw new Error("403: Forbidden. You do not own this order.");
  }

  await cancelOrderDb(orderId);
  revalidatePath("/orders");

  return { success: true, message: `Order ${orderId} cancelled successfully.` };
}