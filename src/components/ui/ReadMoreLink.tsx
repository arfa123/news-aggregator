"use client";

import Link from "next/link";

import useArticle from "@/hooks/useArticle";

const ReadMoreLink = ({ article }: { article: Article }) => {
  const { setSelectedArticle } = useArticle();

  const handleClick = () => {
    setSelectedArticle(article);
  };

  return (
    <Link
      href="/article"
      onClick={handleClick}
      aria-label={article.title}
      className="block bg-gray-100 py-3 text-center text-blue-500 transition duration-300 hover:bg-gray-200"
    >
      Read Full Article
    </Link>
  );
};

export default ReadMoreLink;
