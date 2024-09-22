import ArticleCard from "@/components/cards/ArticleCard";
import { ArticleCardsContainer } from "@/components/containers/ArticleCardsContainer";
import SearchArticle from "@/components/forms/SearchArticle";
import Pagination from "@/components/ui/Pagination";
import { getGuardianApiArticles } from "@/lib/actions/guardianApi.actions";
import { getNewYorkTimesApiArticles } from "@/lib/actions/newYorkTimesApi.actions";
import { getNewsApiArticles } from "@/lib/actions/newsApi.actions";
import { shuffleArray } from "@/lib/helpers";

const NEW_YORK_TIMES_IMAGES_BASE_URL =
  process.env.NEW_YORK_TIMES_IMAGES_BASE_URL;

const mapNewsApiArticles = (data?: {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}) =>
  data?.articles.map(({ title, description, urlToImage, source, url }) => ({
    title,
    description,
    imageUrl: urlToImage,
    source: source.name,
    url,
  })) || [];

const mapGuardianApiArticles = (data?: {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: GuardianAPIArticle[];
  };
}) =>
  data?.response.results.map(({ fields }) => ({
    title: fields.headline,
    description: fields.trailText,
    imageUrl: fields.thumbnail,
    source: "Guardian",
    url: fields.shortUrl,
  })) || [];

const mapNewYorkTimesArticles = (data?: {
  docs: NewYorkTimesAPIArticle[];
  meta: {
    hits: number;
    offset: number;
    time: number;
  };
}) =>
  data?.docs.map(({ web_url, headline, abstract, source, multimedia }) => ({
    title: headline.main,
    description: abstract,
    imageUrl: `${NEW_YORK_TIMES_IMAGES_BASE_URL}${multimedia?.[0]?.url}`,
    source,
    url: web_url,
  })) || [];

export default async function HomePage({ searchParams }: PageParams) {
  const pagePath = "/";
  const currentPage = searchParams.page || "1";

  const [
    newsApiArticlesData,
    guardianApiArticlesData,
    newYorkTimesApiArticlesData,
  ] = await Promise.all([
    getNewsApiArticles({ page: currentPage }),
    getGuardianApiArticles({ page: currentPage }),
    getNewYorkTimesApiArticles({ page: currentPage }),
  ]);

  const newsApiArticles = mapNewsApiArticles(newsApiArticlesData);
  const guardianApiArticles = mapGuardianApiArticles(guardianApiArticlesData);
  const newYorkTimesApiArticles = mapNewYorkTimesArticles(
    newYorkTimesApiArticlesData
  );

  const articles = shuffleArray([
    ...newsApiArticles,
    ...guardianApiArticles,
    ...newYorkTimesApiArticles,
  ]);

  const totalPages =
    Math.max(
      newsApiArticlesData?.totalResults || 0,
      guardianApiArticlesData?.response.pages || 0,
      newYorkTimesApiArticlesData?.meta.hits || 0
    ) || 1;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchArticle />
      </div>

      <ArticleCardsContainer>
        {articles?.map((article, index) => (
          <ArticleCard key={`article-${index}`} {...article} />
        ))}
      </ArticleCardsContainer>

      <Pagination
        pagePath={pagePath}
        currentPage={+currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
