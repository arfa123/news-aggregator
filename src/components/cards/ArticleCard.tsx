import Image from "next/image";
import Link from "next/link";

const ArticleCard = ({
  title,
  description,
  imageUrl,
  category,
  source,
  url,
}: {
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  source: string;
  url: string;
}) => {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-md">
      <Image
        src={imageUrl}
        alt="Article image"
        className="h-48 w-full object-cover"
        width={200}
        height={200}
      />
      <div className="p-4">
        <span className="text-sm font-semibold text-blue-600">{category}</span>
        <h4 className="my-2 text-lg font-semibold">{title}</h4>
        <p className="mb-4 text-sm text-gray-600">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{source}</span>
          <Link
            href={url || ""}
            target="_blank"
            className="text-sm text-blue-500 hover:underline"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
