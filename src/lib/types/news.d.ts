/* eslint-disable no-unused-vars */
import { NewsAPISources } from "@/lib/enums/news.enums";

type NewsAPIArticle = {
  source: { id: NewsAPISources; name: string };
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};
