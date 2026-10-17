import { Inter } from "next/font/google";
import Link from "next/link";
import { getSession } from "@/lib/session";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL("https://addiseats.et"),
  title: {
    default: "Addis Eats | Authentic Ethiopian Food Delivery",
    template: "%s | Addis Eats",
  },
  description: "Traditional Ethiopian food delivery across Addis Ababa. Order Doro Wat, Kitfo, and Shiro paid with TeleBirr.",
  openGraph: {
    siteName: "Addis Eats",
    locale: "en_ET",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  const user = await getSession();

  return (
    <html lang="en" className={inter.className}>
      <body className="max-w-4xl mx-auto p-6 font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <header className="border-b pb-4 mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <Link href="/" className="font-black text-xl text-amber-700">Addis Eats</Link>
          <nav className="flex items-center gap-4 text-sm font-semibold text-slate-700">
            <Link href="/menu">Menu</Link>
            <Link href="/search">Search</Link>
            <Link href="/orders/ord_812">My Order</Link>
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
        <footer className="mt-12 pt-4 border-t text-center text-xs text-slate-400">
          Day 20 / Day 45: Advanced Next.js Production Architecture
        </footer>
      </body>
    </html>
  );
}