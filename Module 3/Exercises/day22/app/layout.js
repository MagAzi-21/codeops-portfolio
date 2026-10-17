import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Day 22 Exercises - Maps, Real-Time & Formats",
  description: "CodeOps Module 3 Day 47 Exercises",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-4xl mx-auto p-6 font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <header className="border-b pb-4 mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <Link href="/" className="font-black text-xl text-amber-700">Addis Eats Live</Link>
          <nav className="flex items-center gap-5 text-sm font-semibold text-slate-700">
            <Link href="/">Home</Link>
            <Link href="/track/ord_812">Live Map Track</Link>
            <Link href="/orders">Orders & CSV</Link>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-12 pt-4 border-t text-center text-xs text-slate-400">
          Module 3 Day 47: Leaflet OpenStreetMap, Server-Sent Events & Ethiopian Formats
        </footer>
      </body>
    </html>
  );
}