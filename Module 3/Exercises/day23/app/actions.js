"use server";

import { createOrder } from "@/lib/db";

// Server action handling order submission
export async function placeOrderAction(prevState, formData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const dish = formData.get("dish");

  if (!phone || phone.trim().length < 9) {
    return {
      success: false,
      error: "Please enter a valid TeleBirr phone number (09...)",
    };
  }

  const order = await createOrder({ name, phone, dish });

  return {
    success: true,
    orderId: order.id,
    error: null,
  };
}