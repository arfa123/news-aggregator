export default function ArticleModalLoader() {
  return (
    <dialog open className="fixed inset-0 z-50 bg-transparent">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl animate-pulse rounded-lg bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-start justify-between">
            <div className="h-8 w-3/4 rounded bg-gray-300" />
            <div className="size-6 rounded-full bg-gray-300" />
          </div>
          <div className="mb-6 flex flex-wrap gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="mr-2 size-5 rounded-full bg-gray-300" />
                <div className="h-5 w-20 rounded bg-gray-300" />
              </div>
            ))}
          </div>
          <div className="mb-6 space-y-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-4 w-full rounded bg-gray-300" />
            ))}
          </div>
          <div className="flex justify-end">
            <div className="h-10 w-32 rounded bg-gray-300" />
          </div>
        </div>
      </div>
    </dialog>
  );
}
