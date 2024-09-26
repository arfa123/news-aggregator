import { z } from "zod";

import {
  PersonalizedNewsFeedFormFields,
  SearchArticlesFormFields,
} from "@/types/enums";

export const SearchArticlesFormSchema = z.object({
  [SearchArticlesFormFields.keyword]: z.string().optional(),
  [SearchArticlesFormFields.fromDate]: z.string().optional(),
  [SearchArticlesFormFields.toDate]: z.string().optional(),
  [SearchArticlesFormFields.newsSource]: z.string().optional(),
  [SearchArticlesFormFields.category]: z.string().optional(),
});

export const PersonalizedNewsFeedFormSchema = z.object({
  [PersonalizedNewsFeedFormFields.preferredNewsSources]: z
    .string()
    .array()
    .optional(),
  [PersonalizedNewsFeedFormFields.preferredCategories]: z
    .string()
    .array()
    .optional(),
  [PersonalizedNewsFeedFormFields.preferredAuthors]: z.string().optional(),
});
