import ArticlesSectionSkeletonUI from "@/components/ui/ArticlesSectionSkeletonUI";

export default function HomeLoader() {
  return (
    <main className="container mx-auto animate-pulse px-4 py-8">
      <div className="mb-8">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="space-y-4 md:flex md:flex-wrap md:items-end md:gap-4 md:space-y-0">
            {[...Array(6)].map((i) => (
              <div
                key={`filter-${i}`}
                className="h-10 w-full rounded bg-gray-300 md:w-44"
              ></div>
            ))}
          </div>
        </div>
      </div>

      <ArticlesSectionSkeletonUI />
    </main>
  );
}
