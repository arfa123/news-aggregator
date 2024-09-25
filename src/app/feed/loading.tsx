import ArticlesSectionSkeletonUI from "@/components/ui/ArticlesSectionSkeletonUI";

export default function FeedPageLoader() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 h-8 w-64 animate-pulse rounded-md bg-gray-300"></div>

      <div className="mb-8">
        <div className="mb-4 h-6 w-48 animate-pulse rounded-md bg-gray-300"></div>
      </div>

      <ArticlesSectionSkeletonUI />
    </main>
  );
}
