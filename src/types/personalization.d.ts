/* eslint-disable no-unused-vars */
import { z } from "zod";

import { PersonalizedNewsFeedFormSchema } from "@/lib/schemas";

declare global {
  type PersonalizedNewsFeed = z.infer<typeof PersonalizedNewsFeedFormSchema>;
}

export {};
