import dayjs from "dayjs";

import { isHTML } from "@/lib/utils";
import { DateFormats } from "@/types/enums";
import {
  CalendarIcon,
  NewspaperIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const ArticleDetails = ({
  article,
  showFullContent = false,
}: {
  article: Article;
  showFullContent?: boolean;
}) => {
  const renderContent = () => {
    const content = showFullContent ? article.content : article.description;
    if (isHTML(content)) {
      return (
        <div
          className={`prose max-w-none ${showFullContent ? "mb-6" : "mb-4 line-clamp-3"}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    } else {
      return (
        <p
          className={`text-gray-800 ${showFullContent ? "mb-6" : "mb-4 line-clamp-3"}`}
        >
          {content}
        </p>
      );
    }
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">{article.title}</h2>
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center text-sm text-gray-600">
          <UserIcon className="mr-2 size-5" />
          <span>{article.author || "Unknown Author"}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <NewspaperIcon className="mr-2 size-5" />
          <span>{article.source}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="mr-2 size-5" />
          <span>{dayjs(article.date).format(DateFormats.MMMMDDYYYY)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <TagIcon className="mr-2 size-5" />
          <span>{article.category}</span>
        </div>
      </div>
      {renderContent()}
    </>
  );
};

export default ArticleDetails;
