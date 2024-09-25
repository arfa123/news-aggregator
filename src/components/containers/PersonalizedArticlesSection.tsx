import Link from "next/link";

import ArticleCard from "@/components/cards/ArticleCard";
import { ArticleCardsContainer } from "@/components/containers/ArticleCardsContainer";
import Pagination from "@/components/ui/Pagination";
import { getFeedArticles } from "@/lib/actions/feed.actions";

const PersonalizedArticlesSection = async (searchParams: {
  page?: string;
  newsSources?: string[];
  categories?: string[];
  authors?: string[];
}) => {
  const { articles, totalPages, error } = await getFeedArticles(searchParams);

  return (
    <>
      <ArticleCardsContainer>
        {articles?.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </ArticleCardsContainer>
      {!articles?.length && error ? (
        <div>
          {error}{" "}
          <Link
            href="/feed"
            className="inline-block text-blue-500 hover:underline"
          >
            Reset
          </Link>
        </div>
      ) : (
        <p>No Article Found</p>
      )}
      <Pagination totalPages={totalPages} />
    </>
  );
};

export default PersonalizedArticlesSection;
