import ArticleCard from "@/components/articles/ArticleCard";
import ArticlesErrorCard from "@/components/articles/ArticlesErrorCard";
import NoArticlesMessageCard from "@/components/articles/NoArticlesMessageCard";
import ArticleCardsContainer from "@/components/sections/ArticleCardsContainer";
import Pagination from "@/components/ui/Pagination";
import { getArticles } from "@/services/articleService";

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
        {articles?.map((article, index) => (
          <ArticleCard
            key={article.id}
            {...article}
            imagePriority={index === 0}
          />
        ))}
      </ArticleCardsContainer>
      {!articles?.length ? (
        error ? (
          <ArticlesErrorCard error={error} />
        ) : (
          <NoArticlesMessageCard />
        )
      ) : null}
      <Pagination totalPages={totalPages} />
    </>
  );
};

export default ArticlesSection;
