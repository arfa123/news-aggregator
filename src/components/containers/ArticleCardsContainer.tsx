import { PropsWithChildren } from "react";

const ArticleCardsContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
};

export default ArticleCardsContainer;
