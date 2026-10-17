import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import Providers from "@/components/Providers";
import { getSession } from "@/lib/session";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://addiseats.et"),
  title: {
    default: "Addis Eats | Authentic Ethiopian Food Delivery in Addis Ababa",
    template: "%s | Addis Eats",
  },
  description:
    "Order traditional Ethiopian Doro Wat, Kitfo, Tibs, and fasting Beyaynetu delivered warm across Addis Ababa. Fast payment via TeleBirr.",
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

export default async function RootLayout({ children }) {
  const user = await getSession();

  return (
    <html lang="en" className={inter.className}>
      <body className="max-w-4xl mx-auto p-6 font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <Providers>
          <header className="border-b pb-4 mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
            <Link href="/" className="text-2xl font-black text-amber-700 tracking-tight">
              Addis Eats
            </Link>
            <nav className="flex items-center gap-5 text-sm font-semibold text-slate-700">
              <Link href="/" className="hover:text-amber-700">Home</Link>
              <Link href="/menu" className="hover:text-amber-700">Menu</Link>
              <Link href="/dashboard" className="hover:text-amber-700">Dashboard</Link>
              <Link href="/search" className="hover:text-amber-700">Search</Link>
              <Link href="/orders" className="hover:text-amber-700">Orders</Link>
              <Link href="/cart" className="hover:text-amber-700">Cart</Link>
              {user?.role === "staff" && (
                <Link href="/kitchen" className="text-amber-600 font-bold">Kitchen</Link>
              )}
              {!user ? (
                <Link href="/signin" className="px-3 py-1 bg-amber-600 text-white rounded text-xs">
                  Sign In
                </Link>
              ) : (
                <span className="text-xs text-slate-400">({user.name})</span>
              )}
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="mt-12 pt-6 border-t text-center text-xs text-slate-500">
            © 2026 Addis Eats.
          </footer>
        </Providers>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}