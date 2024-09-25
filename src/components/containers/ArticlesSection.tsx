import Link from "next/link";

import ArticleCard from "@/components/cards/ArticleCard";
import { ArticleCardsContainer } from "@/components/containers/ArticleCardsContainer";
import Pagination from "@/components/ui/Pagination";
import { getArticles } from "@/lib/actions/article.actions";

const ArticlesSection = async (searchParams: {
  page?: string;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
  newsSource?: string;
  category?: string;
}) => {
  const { articles, totalPages, error } = await getArticles(searchParams);

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
          <Link href="/" className="inline-block text-blue-500 hover:underline">
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

export default ArticlesSection;
