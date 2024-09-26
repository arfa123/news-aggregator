const ArticleDetailsSkeletonUI = ({
  showFullContent = false,
}: {
  showFullContent?: boolean;
}) => {
  return (
    <div className="animate-pulse">
      <div className="mb-4 h-8 w-3/4 rounded bg-gray-200" />
      <div className="mb-6 flex flex-wrap gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center">
            <div className="mr-2 size-5 rounded-full bg-gray-300" />
            <div className="h-4 w-20 rounded bg-gray-200" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        {showFullContent && (
          <>
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-4/5 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailsSkeletonUI;
