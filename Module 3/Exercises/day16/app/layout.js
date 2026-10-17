import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Day 16 Exercises - Data Fetching & SWR",
  description: "CodeOps Module 3 Day 41 Exercises",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto p-6 font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <header className="border-b pb-4 mb-6 flex justify-between items-center">
          <span className="font-bold text-lg">Day 16 Exercises</span>
          <nav className="flex gap-4 text-blue-600 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/orders/ord_101">Live Order Status</Link>
            <Link href="/search">Live Search</Link>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-12 pt-4 border-t text-center text-xs text-slate-400">
          Module 3 Day 41: SWR Client Caching & Stale-While-Revalidate
        </footer>
      </body>
    </html>
  );
}