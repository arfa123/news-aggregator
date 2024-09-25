import Image from "next/image";
import Link from "next/link";

import dayjs from "dayjs";

import { DateFormats } from "@/lib/enums";
import { Article } from "@/lib/types";

const ArticleCard = ({
  title,
  description,
  imageUrl,
  source,
  url,
  date,
  category,
}: Article) => {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-md">
      <Image
        src={imageUrl}
        alt={title}
        className="h-48 w-full object-cover"
        width={200}
        height={200}
      />
      <div className="p-4">
        <span className="text-sm font-semibold text-blue-600">{category}</span>
        <h4 className="my-2 text-lg font-semibold">{title}</h4>
        <p className="mb-4 text-sm text-gray-600">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Source: {source}</span>
          <span className="text-sm text-gray-500">
            {dayjs(date).format(DateFormats.MMMMDDYYYY)}
          </span>
        </div>
        <Link
          href={url || ""}
          target="_blank"
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
