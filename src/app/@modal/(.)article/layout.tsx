import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article Modal",
};

export default function ArticleModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
