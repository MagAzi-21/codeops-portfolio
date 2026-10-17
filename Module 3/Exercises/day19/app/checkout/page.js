export const metadata = {
  title: "Checkout",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return (
    <div className="bg-white p-6 border rounded-xl max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-2">Secure Checkout</h1>
      <p className="text-xs text-slate-500">Private payment process.</p>
    </div>
  );
}