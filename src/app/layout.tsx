import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ArticleProvider } from "@/contexts/ArticleContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "News Aggregator - Home",
  description: "News Aggregator",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <ArticleProvider>
          {modal}
          <Header />
          {children}
          <Footer />
        </ArticleProvider>
      </body>
    </html>
  );
}
