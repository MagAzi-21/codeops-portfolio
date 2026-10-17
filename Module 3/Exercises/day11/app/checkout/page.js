"use client";

import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">TeleBirr Checkout</h2>
      <p className="text-gray-600 mb-4">Complete your payment details.</p>
      <button
        onClick={() => router.push("/menu")}
        className="bg-green-600 text-white px-4 py-2 rounded font-medium"
      >
        Simulate Order & Return to Menu
      </button>
    </div>
  );
}