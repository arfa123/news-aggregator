import { z } from "zod";

import { SearchArticlesFormFields } from "@/lib/enums/news.enums";

export const SearchArticlesFormSchema = z.object({
  [SearchArticlesFormFields.keyword]: z.string().optional(),
  [SearchArticlesFormFields.fromDate]: z.string().optional(),
  [SearchArticlesFormFields.toDate]: z.string().optional(),
  [SearchArticlesFormFields.newsSource]: z.string().optional(),
  [SearchArticlesFormFields.category]: z.string().optional(),
});
