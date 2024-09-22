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
  const { articles, totalPages } = await getArticles(searchParams);

  return (
    <>
      <ArticleCardsContainer>
        {articles?.map((article, index) => (
          <ArticleCard key={`article-${index}`} {...article} />
        ))}
      </ArticleCardsContainer>
      <Pagination totalPages={totalPages} />
    </>
  );
};

export default ArticlesSection;
