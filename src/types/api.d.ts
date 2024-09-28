/* eslint-disable no-unused-vars */
declare global {
  type ArticleAPIParams = {
    page?: string;
    keyword?: string;
    fromDate?: string;
    toDate?: string;
    categories?: string[] | string;
    authors?: string[];
  };

  type NewsAPIArticle = {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  };

  type GuardianAPIArticle = {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    fields: {
      headline: string;
      trailText: string;
      shortUrl: string;
      thumbnail: string;
      publication: string;
      body: string;
      byline: string;
    };
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
  };

  type NewYorkTimesAPIArticle = {
    abstract: string;
    web_url: string;
    snippet: string;
    lead_paragraph: string;
    source: string;
    multimedia: {
      rank: number;
      subtype: string;
      caption: any;
      credit: any;
      type: string;
      url: string;
      height: number;
      width: number;
      legacy: {
        xlarge?: string;
        xlargewidth?: number;
        xlargeheight?: number;
        thumbnail?: string;
        thumbnailwidth?: number;
        thumbnailheight?: number;
        widewidth?: number;
        wideheight?: number;
        wide?: string;
      };
      subType: string;
      crop_name: string;
    }[];
    headline: {
      main: string;
      kicker?: string;
      content_kicker: any;
      print_headline?: string;
      name: any;
      seo: any;
      sub: any;
    };
    keywords: {
      name: string;
      value: string;
      rank: number;
      major: string;
    }[];
    pub_date: string;
    document_type: string;
    news_desk: string;
    section_name: string;
    subsection_name?: string;
    byline: {
      original: string;
      person: {
        firstname: string;
        middlename?: string;
        lastname: string;
        qualifier: any;
        title: any;
        role: string;
        organization: string;
        rank: number;
      }[];
      organization: any;
    };
    type_of_material: string;
    _id: string;
    word_count: number;
    uri: string;
    print_section?: string;
    print_page?: string;
  };
}

export {};
