import Image from "next/image";

import ArticleDetails from "@/components/articles/ArticleDetails";
import ReadMoreLink from "@/components/ui/ReadMoreLink";

const ArticleCard = ({
  imagePriority = false,
  ...article
}: { imagePriority?: boolean } & Article) => {
  const { imageUrl, title } = article;
  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md">
      {imageUrl ? (
        <div className="relative h-48 w-full">
          <Image
            fill
            src={imageUrl}
            alt={title}
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            loading={imagePriority ? "eager" : "lazy"}
            priority={imagePriority}
          />
        </div>
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-gray-200">
          <span className="text-gray-400">No image available</span>
        </div>
      )}
      <div className="flex grow flex-col p-6">
        <ArticleDetails article={article} showFullContent={false} />
      </div>
      <ReadMoreLink article={article} />
    </article>
  );
};

export default ArticleCard;
