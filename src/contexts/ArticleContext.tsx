"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { LocalStorageKeys } from "@/lib/enums";
import { Article } from "@/lib/types";

interface ArticleContextType {
  selectedArticle: Article | null;
  // eslint-disable-next-line no-unused-vars
  setSelectedArticle: (article: Article | null) => void;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const storedArticle = localStorage.getItem(
      LocalStorageKeys.selectedArticle
    );
    if (storedArticle) {
      setSelectedArticle(JSON.parse(storedArticle));
    }
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

export function useArticle() {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error("useArticle must be used within an ArticleProvider");
  }
  return context;
}
