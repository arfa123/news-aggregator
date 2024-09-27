"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import ArticleDetails from "@/components/articles/ArticleDetails";
import useArticle from "@/hooks/useArticle";
import { Paths } from "@/types/enums";

export default function ArticlePage() {
  const { selectedArticle } = useArticle();
  const router = useRouter();

  useEffect(() => {
    if (!selectedArticle) {
      router.push(Paths.home);
    }
  }, [selectedArticle, router]);

  if (!selectedArticle) return null;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <ArticleDetails article={selectedArticle} showFullContent={true} />
      <div className="mt-6 flex items-center justify-between">
        <Link href={Paths.home} className="text-blue-500 hover:underline">
          ← Back to Home
        </Link>
        <a
          href={selectedArticle.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
        >
          Read Full Article
        </a>
      </div>
    </div>
  );
}
