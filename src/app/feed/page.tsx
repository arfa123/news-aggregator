import ArticleCard from "@/components/cards/ArticleCard";
import { ArticleCardsContainer } from "@/components/containers/ArticleCardsContainer";

export default function FeedPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">Your Personalized News Feed</h2>

      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Top Stories for You</h3>
        <ArticleCardsContainer>
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </ArticleCardsContainer>
      </div>
    </main>
  );
}
