import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

// Exercise 4: next/font downloads font at build time, self-hosts from origin, eliminates external Google HTTP requests and CLS
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Text readable immediately with matched fallback
});

export const metadata = {
  title: "Day 18 Exercises - Optimisation & Environment",
  description: "CodeOps Module 3 Day 43 Exercises",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="max-w-4xl mx-auto p-6 font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <header className="border-b pb-4 mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <Link href="/" className="font-extrabold text-xl text-amber-700">Addis Eats Perf</Link>
          <nav className="flex gap-4 text-sm font-semibold">
            <Link href="/">Home</Link>
            <Link href="/menu">Optimized Menu</Link>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-12 pt-4 border-t text-center text-xs text-slate-400">
          Module 3 Day 43: Core Web Vitals (LCP, CLS, INP) & Environment Architecture
        </footer>

        {/* Exercise 5: Third-party script loaded during browser idle time */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}