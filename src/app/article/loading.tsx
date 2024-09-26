export default function ArticlePageLoader() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse p-6">
      <div className="mb-6 h-10 w-3/4 rounded bg-gray-300" />
      <div className="mb-6 flex flex-wrap gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center">
            <div className="mr-2 size-5 rounded-full bg-gray-300" />
            <div className="h-5 w-20 rounded bg-gray-300" />
          </div>
        ))}
      </div>
      <div className="mb-6 space-y-4">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="h-4 w-full rounded bg-gray-300" />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="h-10 w-24 rounded bg-gray-300" />
        <div className="h-10 w-32 rounded bg-gray-300" />
      </div>
    </div>
  );
}
