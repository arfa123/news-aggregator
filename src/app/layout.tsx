import type { Metadata } from "next";

import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "News Aggregator - Home",
  description: "News Aggregator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
