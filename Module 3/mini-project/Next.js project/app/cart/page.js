import Link from "next/link";

export default function CartPage() {
  return (
    <div className="bg-white border rounded-2xl p-6 max-w-lg mx-auto shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Food Cart</h2>
      <p className="text-slate-500 text-xs mb-6">Review your order before proceeding to TeleBirr checkout.</p>

      <div className="border rounded-lg p-4 bg-slate-50 text-center py-8 mb-6">
        <p className="text-slate-600 text-sm">Your order is ready for checkout.</p>
      </div>

      <div className="flex justify-between items-center">
        <Link href="/menu" className="text-xs text-blue-600 hover:underline">
          ← Add more dishes
        </Link>
        <Link
          href="/checkout"
          className="px-5 py-2.5 bg-amber-600 text-white text-sm font-bold rounded-lg hover:bg-amber-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}