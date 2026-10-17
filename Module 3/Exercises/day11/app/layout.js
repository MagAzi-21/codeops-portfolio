import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Addis Eats | Next.js App Router",
  description: "Module 3 Day 36 Routing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-2xl mx-auto p-6 font-sans">
        <header className="border-b pb-4 mb-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-amber-700">Addis Eats</Link>
          <nav className="flex gap-4 text-blue-600 font-medium text-sm">
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}