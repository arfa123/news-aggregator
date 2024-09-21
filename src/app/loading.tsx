export default function HomeLoader() {
  return (
    <div className="animate-pulse">
      <div className="mb-8">
        <div className="mb-4 h-8 w-1/4 rounded bg-gray-200"></div>
        <div className="mb-2.5 h-4 w-full rounded bg-gray-200"></div>
        <div className="mb-2.5 h-4 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
            <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
            <div className="mb-4 h-4 w-2/3 rounded bg-gray-200"></div>
            <div className="h-8 w-1/3 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="size-8 rounded-full bg-gray-200"></div>
        ))}
      </div>
    </div>
  );
}
