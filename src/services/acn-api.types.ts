// services/acn-api.types.ts
// These types describe what the OLD API actually returns.
// Do not use these anywhere except the adapter below.

export interface AcnPhoto {
  thumbImage: string;
  bigImage: string;
  caption: string;
}

export interface AcnStock {
  companyName: string;
  url: string;
  exchangeName: string;
  bloombergCode: string;
  reutersCode: string;
  quoteMediaCode: string;
  ticker: string;
  isin: string;
}

export interface AcnCompany {
  comp_ID: string;
  company_Name: string;
  companyNameCH?: string;
  companyNameCT?: string;
  companyNameJP?: string;
  companyNameKO?: string;
  issuer?: string;
  logofilename: string;
  url: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  telegram?: string;
}

export interface AcnLocation {
  name: string;
  sub_Location: string;
}

export interface AcnPressRelease {
  id: number;
  headline: string;
  subHeadline: string;
  dateTime: string;
  bodyText: string;
  bodyHtml: string;
  language: string;
  source: string;
  supplier: string;
  location: AcnLocation;
  url: string;
  photo: AcnPhoto[];
  sector: string[];
  topic: string;
  views: string;
  companies: AcnCompany[];
  stock: AcnStock[] | null;
}