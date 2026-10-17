import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Day 21 Exercises - Data Representation",
  description: "CodeOps Module 3 Day 46 Exercises: Charts, Tables & States",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-4xl mx-auto p-6 font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <header className="border-b pb-4 mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <Link href="/" className="font-black text-xl text-amber-700">Addis Eats Data</Link>
          <nav className="flex items-center gap-5 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-amber-700">Overview</Link>
            <Link href="/dashboard" className="hover:text-amber-700">Dashboard</Link>
            <Link href="/orders" className="hover:text-amber-700">Order Table</Link>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-12 pt-4 border-t text-center text-xs text-slate-400">
          Module 3 Day 46: Accessible Tables, Recharts, and State Architecture
        </footer>
      </body>
    </html>
  );
}