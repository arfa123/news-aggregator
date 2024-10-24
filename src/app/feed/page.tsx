import { Suspense } from "react";

import { Metadata } from "next";
import { cookies } from "next/headers";

import SearchPersonalizedNewsFeedForm from "@/components/forms/SearchPersonalizedNewsFeedForm";
import PersonalizedArticlesSection from "@/components/sections/PersonalizedArticlesSection";
import ArticlesSectionSkeletonUI from "@/components/ui/ArticlesSectionSkeletonUI";
import { CookiesKeys } from "@/types/enums";

export const metadata: Metadata = {
  title: "News Feed",
};

export default async function FeedPage(props: {
  searchParams: Promise<{
    page?: string;
    newsSource?: string;
    category?: string;
    authors?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const urlSearchParams = new URLSearchParams(
    Object.entries(searchParams)
  ).toString();

  const personalizedNewsFeedPreferences = (await cookies()).get(
    CookiesKeys.personalizedNewsFeedPreferences
  )?.value;

  const newsSources = searchParams ? searchParams.newsSource?.split(",") : [];
  const categories = searchParams ? searchParams.category?.split(",") : [];
  const authors = searchParams
    ? searchParams.authors?.split(",").map((author) => author.trim())
    : [];

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
