// app/cart/page.js
export const metadata = {
  title: "Shopping Cart",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return (
    <div className="bg-white p-6 border rounded-xl max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-2">Your Cart</h1>
      <p className="text-xs text-slate-500">Unindexed client utility route.</p>
    </div>
  );
}