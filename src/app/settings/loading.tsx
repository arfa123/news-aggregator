export default function SettingsPageLoader() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 h-8 w-64 animate-pulse rounded bg-gray-200"></div>

      <div className="rounded-lg bg-white p-6 shadow-md md:p-8">
        <div className="mb-8">
          <div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200"></div>
          <div className="relative">
            <div className="mb-1 h-4 w-32 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="mt-2 h-4 w-full animate-pulse rounded bg-gray-200"></div>
        </div>

        <div className="mb-8">
          <div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200"></div>
          <div className="relative">
            <div className="mb-1 h-4 w-32 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="mt-2 h-4 w-full animate-pulse rounded bg-gray-200"></div>
        </div>

        <div className="mb-8">
          <div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200"></div>
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-1 h-4 w-32 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>

        <div className="h-10 w-full animate-pulse rounded bg-gray-200 md:w-40"></div>
      </div>
    </main>
  );
}
