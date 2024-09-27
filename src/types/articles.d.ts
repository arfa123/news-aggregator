/* eslint-disable no-unused-vars */

declare global {
  type Article = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    source: string;
    url: string;
    date: string;
    category: string;
    content: string;
    author: string;
  };

  type ArticleAPIResponse =
    | {
        data?: Article[];
        totalPages?: number;
        error?: string;
      }
    | undefined;
}

export {};
