import { Suspense } from "react";

import { Metadata } from "next";

import SearchArticlesForm from "@/components/forms/SearchArticlesForm";
import ArticlesSection from "@/components/sections/ArticlesSection";
import ArticlesSectionSkeletonUI from "@/components/ui/ArticlesSectionSkeletonUI";

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    keyword?: string;
    fromDate?: string;
    toDate?: string;
    newsSource?: string;
    category?: string;
  };
}) {
  const urlSearchParams = new URLSearchParams(
    Object.entries(searchParams)
  ).toString();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchArticlesForm />
      </div>

      <Suspense key={urlSearchParams} fallback={<ArticlesSectionSkeletonUI />}>
        <ArticlesSection {...searchParams} />
      </Suspense>
    </main>
  );
}
