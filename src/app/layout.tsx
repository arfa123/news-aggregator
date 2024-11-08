import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ArticleProvider } from "@/contexts/ArticleContext";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "News Aggregator",
    template: "%s | News Aggregator",
  },
  description: "Stay informed with the latest news from multiple sources.",
  icons: {
    icon: [
      { url: "/assets/favicon.ico", sizes: "any" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/assets/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/assets/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [{ url: "/assets/apple-touch-icon.png" }],
  },
  manifest: "/assets/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "News Aggregator",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "News Aggregator",
    title: "News Aggregator",
    description: "Stay informed with the latest news from multiple sources.",
  },
  twitter: {
    card: "summary",
    title: "News Aggregator",
    description: "Stay informed with the latest news from multiple sources.",
  },
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
      <body className="bg-gray-100 [&:has(dialog[open])]:overflow-hidden">
        <ArticleProvider>
          <Header />
          {children}
          <Footer />
          {modal}
        </ArticleProvider>
      </body>
    </html>
  );
}
