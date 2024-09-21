import LoadMoreArticles from "@/components/buttons/LoadMoreArticles";
import ArticleCard from "@/components/cards/ArticleCard";
import { ArticleCardsContainer } from "@/components/containers/ArticleCardsContainer";
import SearchArticle from "@/components/forms/SearchArticle";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchArticle />
      </div>

      <ArticleCardsContainer>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </ArticleCardsContainer>

      <LoadMoreArticles />
    </main>
  );
}
