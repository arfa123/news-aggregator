import { Categories, NewsSources } from "@/lib/enums/news.enums";

export const NEWS_SOURCES = [
  {
    label: "All Source",
    value: "",
  },
  {
    label: "NewsAPI",
    value: NewsSources.NewsAPI,
  },
  {
    label: "The Guardian",
    value: NewsSources.Guardian,
  },
  {
    label: "New York Times",
    value: NewsSources.NewYorkTimes,
  },
] as { label: string; value: string }[];

export const CATEGORIES = [
  {
    label: "All Categories",
    value: "",
  },
  {
    label: "Politics",
    value: Categories.Politics,
  },
  {
    label: "Technology",
    value: Categories.Technology,
  },
  {
    label: "Sports",
    value: Categories.Sports,
  },
] as { label: string; value: string }[];
