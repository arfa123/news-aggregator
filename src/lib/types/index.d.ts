/* eslint-disable no-unused-vars */
import { z } from "zod";

import { PersonalizedNewsFeedFormSchema } from "@/lib/schemas";

type PersonalizedNewsFeed = z.infer<typeof PersonalizedNewsFeedFormSchema>;

type Article = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  url: string;
  date: string;
  category: string;
};

type ArticleAPIResponse =
  | {
      data?: Article[];
      totalPages?: number;
      error?: string;
    }
  | undefined;
