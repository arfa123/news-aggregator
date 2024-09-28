/* eslint-disable no-unused-vars */
export const enum NewsSources {
  NewsAPI = "news-api",
  Guardian = "guardian",
  NewYorkTimes = "new-york-times",
}

export const enum Categories {
  Business = "business",
  Culture = "culture",
  Education = "education",
  Environment = "environment",
  Fashion = "fashion",
  Food = "food",
  Games = "games",
  Health = "health",
  Lifestyle = "lifestyle",
  Movies = "movies",
  News = "news",
  Politics = "politics",
  Science = "science",
  Sports = "sports",
  Technology = "technology",
  Travel = "travel",
  Weather = "weather",
  World = "world",
}

export const enum SearchArticlesFormFields {
  keyword = "keyword",
  fromDate = "from-date",
  toDate = "to-date",
  newsSource = "news-source",
  category = "category",
}

export const enum PersonalizedNewsFeedFormFields {
  preferredNewsSources = "preferred-news-sources",
  preferredCategories = "preferred-categories",
  preferredAuthors = "preferred-authors",
}

export const enum CookiesKeys {
  personalizedNewsFeedPreferences = "personalized-news-feed-preferences",
}

export const enum DateFormats {
  MMMMDDYYYY = "MMMM DD, YYYY",
}

export const enum LocalStorageKeys {
  selectedArticle = "selected-article",
}

export const enum PageSearchParams {
  keyword = "keyword",
  fromDate = "fromDate",
  toDate = "toDate",
  newsSource = "newsSource",
  category = "category",
  authors = "authors",
  page = "page",
}

export const enum Paths {
  home = "/",
  feed = "/feed",
  settings = "/settings",
}

export const enum NewYorkAPIFilterQueryFields {
  newsDesk = "news_desk",
  sectionName = "section_name",
  typeOfMaterial = "type_of_material",
}
