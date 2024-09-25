import ArticleCard from "@/components/cards/ArticleCard";
import ArticlesErrorCard from "@/components/cards/ArticlesErrorCard";
import NoArticlesMessageCard from "@/components/cards/NoArticlesMessageCard";
import ArticleCardsContainer from "@/components/containers/ArticleCardsContainer";
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
