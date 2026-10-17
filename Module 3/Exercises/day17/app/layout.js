import Link from "next/link";
import { getSession } from "@/lib/session";
import "./globals.css";

export const metadata = {
  title: "Day 17 Exercises - Middleware & Auth",
  description: "CodeOps Module 3 Day 42 Exercises",
};

export default async function RootLayout({ children }) {
  const user = await getSession();

  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto p-6 font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <header className="border-b pb-4 mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <Link href="/" className="font-bold text-lg text-amber-700">Addis Eats Auth</Link>
          <nav className="flex gap-4 text-sm font-medium items-center">
            <Link href="/">Home</Link>
            <Link href="/orders">My Orders</Link>
            <Link href="/checkout">Checkout</Link>
            {user?.role === "staff" && (
              <Link href="/kitchen" className="text-amber-600 font-bold">Kitchen</Link>
            )}
            {!user ? (
              <Link href="/signin" className="px-3 py-1 bg-amber-600 text-white rounded text-xs">Sign In</Link>
            ) : (
              <span className="text-xs text-slate-400">({user.name})</span>
            )}
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}