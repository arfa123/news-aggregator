import {
  Categories,
  NewYorkAPIFilterQueryFields,
  NewsSources,
  Paths,
} from "@/types/enums";

export const PAGE_SIZE = "10";

export const DEFAULT_PAGE = "1";

export const CONTENT_TYPE_APPLICATION_JSON = "application/json";

export const FETCH_REVALIDATE_INTERVAL = 60;

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
    label: "New York Times",
    value: NewsSources.NewYorkTimes,
  },
  {
    label: "NewsAPI",
    value: NewsSources.NewsAPI,
  },
  {
    label: "The Guardian",
    value: NewsSources.Guardian,
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
    label: "Business",
    value: Categories.Business,
  },
  {
    label: "Culture",
    value: Categories.Culture,
  },
  {
    label: "Education",
    value: Categories.Education,
  },
  {
    label: "Environment",
    value: Categories.Environment,
  },
  {
    label: "Fashion",
    value: Categories.Fashion,
  },
  {
    label: "Food",
    value: Categories.Food,
  },
  {
    label: "Games",
    value: Categories.Games,
  },
  {
    label: "Health",
    value: Categories.Health,
  },
  {
    label: "Lifestyle",
    value: Categories.Lifestyle,
  },
  {
    label: "Movies",
    value: Categories.Movies,
  },
  {
    label: "News",
    value: Categories.News,
  },
  {
    label: "Politics",
    value: Categories.Politics,
  },
  {
    label: "Science",
    value: Categories.Science,
  },
  {
    label: "Sports",
    value: Categories.Sports,
  },
  {
    label: "Technology",
    value: Categories.Technology,
  },
  {
    label: "Travel",
    value: Categories.Travel,
  },
  {
    label: "Weather",
    value: Categories.Weather,
  },
  {
    label: "World",
    value: Categories.World,
  },
] as { label: string; value: string }[];

export const CATEGORIES = [
  {
    label: "All Categories",
    value: "",
  },
  ...CATEGORIES_OPTIONS,
] as { label: string; value: string }[];

export const CATEGORY_TO_GUARDIAN_API_CATEGORY_MAPPING = {
  [Categories.Business]: "business",
  [Categories.Culture]: "culture",
  [Categories.Education]: "education",
  [Categories.Environment]: "environment",
  [Categories.Fashion]: "fashion",
  [Categories.Food]: "food",
  [Categories.Games]: "games",
  [Categories.Health]: "healthcare-network",
  [Categories.Lifestyle]: "lifeandstyle",
  [Categories.Movies]: "film",
  [Categories.News]: "news",
  [Categories.Politics]: "politics",
  [Categories.Science]: "science",
  [Categories.Sports]: "sport",
  [Categories.Technology]: "technology",
  [Categories.Travel]: "travel",
  [Categories.Weather]: "weather",
  [Categories.World]: "world",
};

export const CATEGORY_TO_NEW_YORK_TIMES_API_CATEGORY_MAPPING = {
  [Categories.Business]: {
    fieldName: NewYorkAPIFilterQueryFields.sectionName,
    value: "Business",
  },
  [Categories.Culture]: {
    fieldName: NewYorkAPIFilterQueryFields.newsDesk,
    value: "Culture",
  },
  [Categories.Education]: {
    fieldName: NewYorkAPIFilterQueryFields.sectionName,
    value: "Education",
  },
  [Categories.Environment]: {
    fieldName: NewYorkAPIFilterQueryFields.newsDesk,
    value: "Environment",
  },
  [Categories.Fashion]: {
    fieldName: NewYorkAPIFilterQueryFields.sectionName,
    value: "Fashion & Style",
  },
  [Categories.Food]: {
    fieldName: NewYorkAPIFilterQueryFields.sectionName,
    value: "Food",
  },
  [Categories.Games]: {
    fieldName: NewYorkAPIFilterQueryFields.sectionName,
    value: "Crosswords/Games",
  },
  [Categories.Health]: {
    fieldName: NewYorkAPIFilterQueryFields.sectionName,
    value: "Health",
  },
  [Categories.Lifestyle]: {
    fieldName: NewYorkAPIFilterQueryFields.sectionName,
    value: "Fashion & Style",
  },
  [Categories.Movies]: {
    fieldName: NewYorkAPIFilterQueryFields.sectionName,
    value: "Movies",
  },
  [Categories.News]: {
    fieldName: NewYorkAPIFilterQueryFields.typeOfMaterial,
    value: "News",
  },
  [Categories.Politics]: {
    fieldName: NewYorkAPIFilterQueryFields.newsDesk,
    value: "Politics",
  },
  [Categories.Science]: {
    fieldName: NewYorkAPIFilterQueryFields.sectionName,
    value: "Science",
  },
  [Categories.Sports]: {
    fieldName: NewYorkAPIFilterQueryFields.sectionName,
    value: "Sports",
  },
  [Categories.Technology]: {
    fieldName: NewYorkAPIFilterQueryFields.sectionName,
    value: "Technology",
  },
  [Categories.Travel]: {
    fieldName: NewYorkAPIFilterQueryFields.sectionName,
    value: "Travel",
  },
  [Categories.Weather]: {
    fieldName: NewYorkAPIFilterQueryFields.newsDesk,
    value: "Weather",
  },
  [Categories.World]: {
    fieldName: NewYorkAPIFilterQueryFields.sectionName,
    value: "World",
  },
};
