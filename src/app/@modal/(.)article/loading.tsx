import ArticleDetailsSkeletonUI from "@/components/ui/ArticleDetailsSkeletonUI";

export default function ArticleModalLoader() {
  return (
    <dialog open>
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-start justify-between">
            <div className="h-8 w-3/4 rounded bg-gray-300" />
            <div className="size-6 rounded-full bg-gray-300" />
          </div>
          <ArticleDetailsSkeletonUI showFullContent={true} />
          <div className="mt-6 flex justify-end">
            <div className="h-10 w-32 rounded bg-gray-300" />
          </div>
        </div>
      </div>
    </dialog>
  );
}
