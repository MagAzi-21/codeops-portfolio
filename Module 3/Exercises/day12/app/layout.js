import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Day 12 Exercises - Layouts & Rendering",
  description: "CodeOps Module 3 Day 37 Exercises",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans">
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <span className="text-xl font-bold text-amber-700">Addis Eats</span>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-amber-700">Home</Link>
              <Link href="/menu" className="hover:text-amber-700">Menu</Link>
              <Link href="/cart" className="hover:text-amber-700">Cart</Link>
              <Link href="/checkout" className="px-3 py-1.5 bg-amber-600 text-white rounded hover:bg-amber-700">
                Checkout
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8 flex-1 w-full">
          {children}
        </main>

        <footer className="border-t bg-white py-6 text-center text-sm text-slate-500">
          © 2026 Addis Eats. Exercise: Layouts & Rendering Strategies.
        </footer>
      </body>
    </html>
  );
}