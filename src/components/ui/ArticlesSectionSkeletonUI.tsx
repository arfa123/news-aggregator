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
              className="flex animate-pulse flex-col overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div className="h-48 w-full bg-gray-300" />
              <div className="flex grow flex-col p-6">
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-300" />
                <div className="mb-2 h-4 w-full rounded bg-gray-300" />
                <div className="mb-2 h-4 w-full rounded bg-gray-300" />
                <div className="mb-4 h-4 w-2/3 rounded bg-gray-300" />
                <div className="mt-auto space-y-2">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-2 size-4 rounded-full bg-gray-300" />
                      <div className="h-4 w-1/2 rounded bg-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-10 bg-gray-300" />
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
