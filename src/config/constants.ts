import { Categories, NewsSources, Paths } from "@/types/enums";

export const PAGE_SIZE = 10;

export const DEFAULT_PAGE = 1;

export const CONTENT_TYPE_APPLICATION_JSON = "application/json";

export const ROUTES = [
  {
    path: Paths.home,
    label: "Home",
  },
  {
    path: Paths.feed,
    label: "My Feed",
  },
  {
    path: Paths.settings,
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
