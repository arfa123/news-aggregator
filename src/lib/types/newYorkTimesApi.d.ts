/* eslint-disable no-unused-vars */
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
