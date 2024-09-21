import ArticleCard from "@/components/cards/ArticleCard";
import { ArticleCardsContainer } from "@/components/containers/ArticleCardsContainer";
import SearchArticle from "@/components/forms/SearchArticle";
import Pagination from "@/components/ui/Pagination";
import { getArticles } from "@/lib/actions/news.actions";

export default async function HomePage({ searchParams }: PageParams) {
  const pagePath = "/";
  const pageSearchParam = searchParams.page || "1";

  const articlesData = await getArticles({ page: pageSearchParam });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchArticle />
      </div>

      <ArticleCardsContainer>
        {articlesData?.articles?.map((article, index) => (
          <ArticleCard
            key={`article-${index}`}
            title={article.title}
            description={article.description}
            imageUrl={article.urlToImage}
            source={article.source.name}
            url={article.url}
          />
        ))}
      </ArticleCardsContainer>

      <Pagination
        pagePath={pagePath}
        currentPage={+pageSearchParam}
        totalPages={articlesData?.totalResults || 0}
      />
    </main>
  );
}
