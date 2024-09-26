/* eslint-disable no-unused-vars */
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
