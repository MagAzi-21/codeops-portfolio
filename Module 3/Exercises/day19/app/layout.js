import Link from "next/link";
import "./globals.css";

// Exercise 1: Base metadata configuration
export const metadata = {
  // Required so relative OpenGraph and twitter card image URLs resolve to absolute URLs
  metadataBase: new URL("https://addiseats.et"),
  title: {
    default: "Addis Eats | Authentic Ethiopian Food Delivery in Addis Ababa",
    template: "%s | Addis Eats", // e.g. "Special Kitfo | Addis Eats"
  },
  description:
    "Order traditional Ethiopian Doro Wat, Kitfo, Tibs, and fasting Beyaynetu delivered warm across Addis Ababa. Payment supported via TeleBirr.",
  openGraph: {
    title: "Addis Eats | Food Delivery in Addis Ababa",
    description:
      "Freshly prepared traditional Ethiopian meals delivered straight to your home or office.",
    url: "https://addiseats.et",
    siteName: "Addis Eats",
    locale: "en_ET",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto p-6 font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <header className="border-b pb-4 mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <Link href="/" className="text-2xl font-black text-amber-700 tracking-tight">
            Addis Eats
          </Link>
          <nav className="flex items-center gap-5 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-amber-700">Home</Link>
            <Link href="/menu" className="hover:text-amber-700">Menu</Link>
            <Link href="/cart" className="hover:text-amber-700">Cart</Link>
            <Link href="/checkout" className="hover:text-amber-700">Checkout</Link>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-12 pt-6 border-t text-center text-xs text-slate-400">
          Module 3 Day 44: Metadata API, OpenGraph Previews, JSON-LD & Dynamic Sitemaps
        </footer>
      </body>
    </html>
  );
}