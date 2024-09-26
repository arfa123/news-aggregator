"use client";

import { useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

import ArticleDetails from "@/components/cards/ArticleDetails";
import { useArticle } from "@/contexts/ArticleContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ArticleModal() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { selectedArticle, setSelectedArticle } = useArticle();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && selectedArticle) {
      dialog.showModal();
    }
  }, [selectedArticle]);

  const handleClose = () => {
    setSelectedArticle(null);
    router.back();
  };

  if (!selectedArticle) return null;

  return (
    <dialog
      ref={dialogRef}
      className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl"
    >
      <div className="mb-4 flex items-start justify-between">
        <h2 className="text-2xl font-bold">{selectedArticle.title}</h2>
        <button
          onClick={handleClose}
          className="rounded-full p-1 text-gray-500 transition-colors duration-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Close dialog"
        >
          <XMarkIcon className="size-6" />
        </button>
      </div>
      <ArticleDetails article={selectedArticle} showFullContent={true} />
      <div className="mt-6 flex justify-end">
        <a
          href={selectedArticle.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
        >
          Read Full Article
        </a>
      </div>
    </dialog>
  );
}