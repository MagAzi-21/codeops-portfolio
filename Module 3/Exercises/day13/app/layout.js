import Link from "next/link";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: "Day 13 Exercises - Server & Client Components",
  description: "CodeOps Module 3 Day 38 Exercises",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-2xl mx-auto p-6 font-sans bg-slate-50 text-slate-900">
        <Providers>
          <header className="border-b pb-4 mb-6 flex justify-between items-center">
            <span className="font-bold text-lg">Day 13 Exercises</span>
            <nav className="flex gap-4 text-blue-600 text-sm font-medium">
              <Link href="/">Home</Link>
              <Link href="/menu">Menu</Link>
            </nav>
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}