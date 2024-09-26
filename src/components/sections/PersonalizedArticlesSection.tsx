import ArticleCard from "@/components/articles/ArticleCard";
import ArticlesErrorCard from "@/components/articles/ArticlesErrorCard";
import NoArticlesMessageCard from "@/components/articles/NoArticlesMessageCard";
import ArticleCardsContainer from "@/components/sections/ArticleCardsContainer";
import Pagination from "@/components/ui/Pagination";
import { getFeedArticles } from "@/services/feedService";

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

export default PersonalizedArticlesSection;
