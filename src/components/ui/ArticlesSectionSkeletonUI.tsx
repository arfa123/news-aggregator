const ArticlesSectionSkeletonUI = () => {
  return (
    <>
      <div className="grid animate-pulse grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)]
          .fill(1)
          .map((e, i) => e + i * 1)
          .map((i) => (
            <article
              key={`article-${i}`}
              className="overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div className="h-48 w-full bg-gray-300"></div>
              <div className="p-4">
                <div className="mb-2 h-4 w-1/4 rounded bg-gray-300"></div>
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-300"></div>
                <div className="mb-4 h-4 w-full rounded bg-gray-300"></div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-1/4 rounded bg-gray-300"></div>
                  <div className="h-4 w-1/4 rounded bg-gray-300"></div>
                </div>
              </div>
            </article>
          ))}
      </div>

      <div className="mt-8 flex animate-pulse justify-center">
        <nav className="inline-flex rounded-md shadow">
          {[...Array(7)]
            .fill(1)
            .map((e, i) => e + i * 1)
            .map((i) => (
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
