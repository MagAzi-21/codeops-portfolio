import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Day 14 Exercises - API Routes & Server Actions",
  description: "CodeOps Module 3 Day 39 Exercises",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-2xl mx-auto p-6 font-sans bg-slate-50 text-slate-900">
        <header className="border-b pb-4 mb-6 flex justify-between items-center">
          <span className="font-bold text-lg">Day 14 Exercises</span>
          <nav className="flex gap-4 text-blue-600 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/checkout">Checkout Form</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}