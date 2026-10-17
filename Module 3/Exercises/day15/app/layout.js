import Link from "next/link";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: "Addis Eats | Next.js Foundations",
  description: "Day 15 / Day 40 Capstone Architecture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-4xl mx-auto p-6 font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <Providers>
          <header className="border-b pb-4 mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
            <Link href="/" className="text-2xl font-black text-amber-700 tracking-tight">
              Addis Eats
            </Link>
            <nav className="flex items-center gap-5 text-sm font-semibold text-slate-700">
              <Link href="/" className="hover:text-amber-700">Home</Link>
              <Link href="/menu" className="hover:text-amber-700">Menu</Link>
              <Link href="/cart" className="hover:text-amber-700">Cart</Link>
              <Link href="/checkout" className="px-3.5 py-1.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                Checkout
              </Link>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="mt-12 pt-6 border-t text-center text-xs text-slate-500">
            © 2026 Addis Eats. Next.js Foundations Project.
          </footer>
        </Providers>
      </body>
    </html>
  );
}