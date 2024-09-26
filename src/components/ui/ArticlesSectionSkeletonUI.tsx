import ArticleDetailsSkeletonUI from "./ArticleDetailsSkeletonUI";

const ArticlesSectionSkeletonUI = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <article
            key={`article-${i}`}
            className="flex animate-pulse flex-col overflow-hidden rounded-lg bg-white shadow-md"
          >
            <div className="h-48 w-full bg-gray-300" />
            <div className="flex grow flex-col p-6">
              <ArticleDetailsSkeletonUI />
            </div>
            <div className="h-10 bg-gray-300" />
          </article>
        ))}
      </div>

      <div className="mt-8 flex animate-pulse justify-center">
        <nav className="inline-flex rounded-md shadow">
          {[...Array(7)].map((_, i) => (
            <div
              key={`pagination-${i}`}
              className="size-10 border border-gray-200 bg-gray-300"
            ></div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default ArticlesSectionSkeletonUI;
