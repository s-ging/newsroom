// services/news-list.ts
// Lightweight list-feed fetcher for card rows on the home page.
// Uses GetNewsByLanguage (langType=0 → ALL languages) as the "latest" feed.
// Swap to /Sector/GetNewsBySector when a sector ID is chosen.

const API_BASE = 'https://www.acnnewswire.com/acnnewswireapi';

export interface NewsListItem {
  id: number;
  headline: string;
  dateTime: string;
  source: string;
  url: string;
  photo: string[];
  sector: string[];
  stock?: Array<{ companyName: string }> | null;
  language?: string | null;
  summary?: string | null;
  subHeadline?: string | null;
  description?: string | null;
}

interface AcnListPhoto {
  thumbImage: string | null;
  bigImage: string | null;
  caption: string | null;
}

interface AcnListArticle {
  id: number;
  headline: string | null;
  subHeadline: string | null;
  dateTime: string | null;
  summary: string | null;
  description: string | null;
  language: string | null;
  source: string | null;
  name: string | null;
  url: string | null;
  photo: AcnListPhoto[] | null;
  sector: string[] | null;
  topic: string | null;
  views: string | null;
  companies?: Array<{ logofilename?: string }> | null;
  stock?: Array<{ companyName: string }> | null;
}

export async function fetchNewsList(page = 1, limit = 20): Promise<NewsListItem[]> {
  const res = await fetch(
    `${API_BASE}/api/v1/News/GetNewsByLanguage?langType=0&pageNumber=${page}&pageSize=${limit}`,
    {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    },
  );

  if (!res.ok) return [];

  const raw: AcnListArticle[] = await res.json();

  return raw.map((a) => ({
    id: a.id,
    headline: a.headline ?? '',
    dateTime: a.dateTime ?? '',
    source: a.source ?? '',
    url: a.url ?? '',
    photo: (a.photo ?? [])
      .map((p) => p.thumbImage ?? p.bigImage ?? null)
      .filter((s): s is string => !!s),
    sector: a.sector ?? [],
    stock: a.stock ?? null,
    language: a.language,
    summary: a.summary ?? null,
    subHeadline: a.subHeadline ?? null,
    description: a.description
      ? a.description.replace(/<[^>]*>/g, '').trim().slice(0, 300)
      : null,
  }));
}

export async function fetchLatestNews(pageSize = 10): Promise<NewsListItem[]> {
  const res = await fetch(
    `${API_BASE}/api/v1/News/GetNewsByLanguage?langType=0&pageNumber=1&pageSize=${pageSize}`,
    {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    },
  );

  if (!res.ok) {
    throw new Error(`API error ${res.status} (GetNewsByLanguage)`);
  }

  const raw: AcnListArticle[] = await res.json();

  return raw.map((a) => ({
    id: a.id,
    headline: a.headline ?? '',
    dateTime: a.dateTime ?? '',
    source: a.source ?? '',
    url: a.url ?? '',
    photo: (a.photo ?? [])
      .map((p) => p.thumbImage ?? p.bigImage ?? null)
      .filter((s): s is string => !!s),
    sector: a.sector ?? [],
    stock: a.stock ?? null,
    language: a.language,
    summary: a.summary ?? null,
    subHeadline: a.subHeadline ?? null,
    description: a.description
      ? a.description.replace(/<[^>]*>/g, '').trim().slice(0, 300)
      : null,
  }));
}