// services/company-articles.ts
import { sanitizeText, sanitizeHeadline } from '@/lib/sanitize';

const API_BASE = 'https://www.acnnewswire.com/acnnewswireapi';

export interface CompanyArticle {
  id: number;
  headline: string;
  dateTime: string;
  thumbImage: string | null;
  description: string | null;
}

export interface CompanyPageData {
  articles: CompanyArticle[];
  companyName: string | null;
  logoSrc: string | null;
}

interface AcnCompanyArticle {
  articleId: number;
  headline: string | null;
  summary: string | null;
  dateTime: string | null;
  views: string | null;
  photo: Array<{ thumbImage: string | null; bigImage: string | null; caption: string | null }> | null;
  companyLogo: string | null;
  companyName?: string | null;
}

export async function fetchCompanyArticles(
  compId: string | undefined | null,
): Promise<CompanyArticle[]> {
  if (!compId) return [];

  const res = await fetch(
    `${API_BASE}/api/v1/Company/GetNewsByCompanyId/${compId}`,
    {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    },
  );

  if (!res.ok) return [];

  const raw: AcnCompanyArticle[] = await res.json();

  return raw.slice(0, 4).map((a) => {
    const rawDesc = a.summary ?? '';
    const description = rawDesc
      ? sanitizeText(rawDesc).slice(0,200)
      : null;

    return {
      id: a.articleId,
      headline: sanitizeHeadline(a.headline) ?? '',
      dateTime: a.dateTime ?? '',
      thumbImage: a.photo?.[0]?.thumbImage ?? a.photo?.[0]?.bigImage ?? null,
      description,
    };
  });
}

export async function fetchAllCompanyArticles(
  compId: string | undefined | null,
): Promise<CompanyPageData> {
  if (!compId) return { articles: [], companyName: null, logoSrc: null };

  const res = await fetch(
    `${API_BASE}/api/v1/Company/GetNewsByCompanyId/${compId}`,
    {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    },
  );

  if (!res.ok) return { articles: [], companyName: null, logoSrc: null };

  const raw: AcnCompanyArticle[] = await res.json();
  const first = raw[0];

  const articles = raw.map((a) => {
    const rawDesc = a.summary ?? '';
    const description = rawDesc
      ? sanitizeText(rawDesc).slice(0, 200)
      : null;

    return {
      id: a.articleId,
      headline: sanitizeHeadline(a.headline) ?? '',
      dateTime: a.dateTime ?? '',
      thumbImage: a.photo?.[0]?.thumbImage ?? a.photo?.[0]?.bigImage ?? null,
      description,
    };
  });

  // GetNewsByCompanyId does not reliably return companyName or logo —
  // fetch the first article via GetArticleById which has companies[].logofilename.
  let companyName: string | null = first?.companyName ?? null;
  let logoSrc: string | null = null;

  if (first) {
    const articleRes = await fetch(
      `${API_BASE}/api/v1/News/GetArticleById/${first.articleId}`,
      { next: { revalidate: 3600 }, headers: { Accept: 'application/json' } },
    );
    if (articleRes.ok) {
      const detail = await articleRes.json() as {
        companies?: Array<{ comp_ID: string; company_Name: string; logofilename: string }>;
      };
      const company = detail.companies?.find(c => c.comp_ID === compId) ?? detail.companies?.[0];
      companyName = company?.company_Name ?? companyName;
      logoSrc = company?.logofilename ?? null;
    }
  }

  return { articles, companyName, logoSrc };
}
