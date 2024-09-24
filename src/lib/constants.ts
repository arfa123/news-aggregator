import { Categories, NewsSources } from "@/lib/enums";

export const PAGE_SIZE = 10;

export const DEFAULT_PAGE = 1;

export const ROUTES = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/feed",
    label: "My Feed",
  },
  {
    path: "/settings",
    label: "Settings",
  },
];

export const NEWS_SOURCES_OPTIONS = [
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

export const NEWS_SOURCES = [
  {
    label: "All Source",
    value: "",
  },
  ...NEWS_SOURCES_OPTIONS,
] as { label: string; value: string }[];

export const CATEGORIES_OPTIONS = [
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
  {
    label: "News",
    value: Categories.News,
  },
  {
    label: "Science",
    value: Categories.Science,
  },
  {
    label: "Fashion",
    value: Categories.Fashion,
  },
  {
    label: "Environment",
    value: Categories.Environment,
  },
  {
    label: "Health",
    value: Categories.Health,
  },
] as { label: string; value: string }[];

export const CATEGORIES = [
  {
    label: "All Categories",
    value: "",
  },
  ...CATEGORIES_OPTIONS,
] as { label: string; value: string }[];
