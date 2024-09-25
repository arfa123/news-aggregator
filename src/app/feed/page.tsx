import { Suspense } from "react";

import { cookies } from "next/headers";

import PersonalizedArticlesSection from "@/components/containers/PersonalizedArticlesSection";
import SearchPersonalizedNewsFeedForm from "@/components/forms/SearchPersonalizedNewsFeedForm";
import ArticlesSectionSkeletonUI from "@/components/ui/ArticlesSectionSkeletonUI";
import { CookiesKeys } from "@/lib/enums";

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

  const personalizedNewsFeedPreferences = cookies().get(
    CookiesKeys.personalizedNewsFeedPreferences
  )?.value;

  const newsSources = searchParams ? searchParams.newsSource?.split(",") : [];
  const categories = searchParams ? searchParams.category?.split(",") : [];
  const authors = searchParams ? searchParams.authors?.split(",") : [];

  return (
    <main className="container mx-auto px-4 py-8">
      <SearchPersonalizedNewsFeedForm
        personalizedNewsFeedPreferences={personalizedNewsFeedPreferences}
      />

      <h2 className="mb-6 text-2xl font-bold">Your Personalized News Feed</h2>

      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Top Stories for You</h3>
        {urlSearchParams ? (
          <Suspense
            key={urlSearchParams}
            fallback={<ArticlesSectionSkeletonUI />}
          >
            <PersonalizedArticlesSection
              {...{ page: searchParams.page, newsSources, categories, authors }}
            />
          </Suspense>
        ) : (
          <ArticlesSectionSkeletonUI />
        )}
      </div>
    </main>
  );
}
