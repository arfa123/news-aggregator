/* eslint-disable no-unused-vars */
export const enum NewsSources {
  NewsAPI = "news-api",
  Guardian = "guardian",
  NewYorkTimes = "new-york-times",
}

export const enum Categories {
  Politics = "politics",
  Technology = "technology",
  Sports = "sports",
  News = "news",
  Science = "science",
  Fashion = "fashion",
  Environment = "environment",
  Health = "health",
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

export const enum LocalStorageKeys {
  personalizedNewsFeedPreferences = "personalizedNewsFeedPreferences",
}
