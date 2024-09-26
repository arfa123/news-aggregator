import ArticleDetailsSkeletonUI from "@/components/ui/ArticleDetailsSkeletonUI";

export default function ArticlePageLoader() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse p-6">
      <ArticleDetailsSkeletonUI showFullContent={true} />
      <div className="flex items-center justify-between">
        <div className="h-10 w-24 rounded bg-gray-300" />
        <div className="h-10 w-32 rounded bg-gray-300" />
      </div>
    </div>
  );
}
