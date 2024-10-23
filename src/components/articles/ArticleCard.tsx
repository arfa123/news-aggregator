import Image from "next/image";

import ArticleDetails from "@/components/articles/ArticleDetails";
import ReadMoreLink from "@/components/ui/ReadMoreLink";

const ArticleCard = (article: Article) => {
  const { imageUrl, title } = article;
  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          className="h-48 w-full object-cover"
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
          loading="lazy"
        />
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
