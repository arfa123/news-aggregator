import { useContext } from "react";

import { ArticleContext } from "@/contexts/ArticleContext";

const useArticle = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error("useArticle must be used within an ArticleProvider");
  }
  return context;
};

export default useArticle;
