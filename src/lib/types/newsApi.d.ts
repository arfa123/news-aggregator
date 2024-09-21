/* eslint-disable no-unused-vars */

type NewsAPIArticle = {
  source: { id: string; name: string };
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};
