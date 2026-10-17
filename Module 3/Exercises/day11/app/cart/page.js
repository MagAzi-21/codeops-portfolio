import Link from "next/link";

export default function CartPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Shopping Cart</h2>
      <p className="text-gray-600 mb-4">Items in cart: 0</p>
      <Link href="/checkout" className="bg-amber-600 text-white px-4 py-2 rounded inline-block">
        Proceed to Checkout
      </Link>
    </div>
  );
}