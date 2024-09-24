/* eslint-disable no-unused-vars */
import { z } from "zod";

import { PersonalizedNewsFeedFormSchema } from "@/lib/schemas";

type PersonalizedNewsFeed = z.infer<typeof PersonalizedNewsFeedFormSchema>;
