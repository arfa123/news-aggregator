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
  const { articles, totalPages } = await getFeedArticles(searchParams);

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

export default PersonalizedArticlesSection;
