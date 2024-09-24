import { Suspense } from "react";

import PersonalizedArticlesSection from "@/components/containers/PersonalizedArticlesSection";
import SearchPersonalizedNewsFeedForm from "@/components/forms/SearchPersonalizedNewsFeedForm";
import ArticlesSectionSkeletonUI from "@/components/ui/ArticlesSectionSkeletonUI";

export default function FeedPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    newsSource?: string;
    category?: string;
    authors?: string;
  };
}) {
  const urlSearchParams = new URLSearchParams(
    Object.entries(searchParams)
  ).toString();

  const newsSources = searchParams ? searchParams.newsSource?.split(",") : [];
  const categories = searchParams ? searchParams.category?.split(",") : [];
  const authors = searchParams ? searchParams.authors?.split(",") : [];

  return (
    <main className="container mx-auto px-4 py-8">
      <SearchPersonalizedNewsFeedForm />

      <h2 className="mb-6 text-2xl font-bold">Your Personalized News Feed</h2>

      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Top Stories for You</h3>
        <Suspense
          key={urlSearchParams}
          fallback={<ArticlesSectionSkeletonUI />}
        >
          <PersonalizedArticlesSection
            {...{ page: searchParams.page, newsSources, categories, authors }}
          />
        </Suspense>
      </div>
    </main>
  );
}
