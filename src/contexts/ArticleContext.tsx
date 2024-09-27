"use client";

import { createContext, useEffect, useState } from "react";

import { LocalStorageKeys } from "@/types/enums";

interface ArticleContextType {
  selectedArticle?: Article | null;
  // eslint-disable-next-line no-unused-vars
  setSelectedArticle: (article: Article | null) => void;
}

export const ArticleContext = createContext<ArticleContextType | undefined>(
  undefined
);

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>();

  useEffect(() => {
    const storedArticle = localStorage.getItem(
      LocalStorageKeys.selectedArticle
    );
    setSelectedArticle(storedArticle ? JSON.parse(storedArticle) : null);
  }, []);

  useEffect(() => {
    if (selectedArticle) {
      localStorage.setItem(
        LocalStorageKeys.selectedArticle,
        JSON.stringify(selectedArticle)
      );
    } else {
      localStorage.removeItem(LocalStorageKeys.selectedArticle);
    }
  }, [selectedArticle]);

  return (
    <ArticleContext.Provider value={{ selectedArticle, setSelectedArticle }}>
      {children}
    </ArticleContext.Provider>
  );
}
