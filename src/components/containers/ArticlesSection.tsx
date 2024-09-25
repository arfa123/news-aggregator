import ArticleCard from "@/components/cards/ArticleCard";
import ArticlesErrorCard from "@/components/cards/ArticlesErrorCard";
import NoArticlesMessageCard from "@/components/cards/NoArticlesMessageCard";
import ArticleCardsContainer from "@/components/containers/ArticleCardsContainer";
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
