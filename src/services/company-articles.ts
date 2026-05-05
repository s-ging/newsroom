// services/company-articles.ts
const API_BASE = 'https://www.acnnewswire.com/acnnewswireapi';

export interface CompanyArticle {
  id: number;
  headline: string;
  dateTime: string;
  thumbImage: string | null;
  description: string | null;
}

interface AcnCompanyArticle {
  articleId: number;
  headline: string | null;
  summary: string | null;
  dateTime: string | null;
  views: string | null;
  photo: Array<{ thumbImage: string | null; bigImage: string | null; caption: string | null }> | null;
  companyLogo: string | null;
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
      ? rawDesc
          .replace(/<[^>]*>/g, '')
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .trim()
          .slice(0, 200)
      : null;

    return {
      id: a.articleId,
      headline: a.headline ?? '',
      dateTime: a.dateTime ?? '',
      thumbImage: a.photo?.[0]?.thumbImage ?? a.photo?.[0]?.bigImage ?? null,
      description,
    };
  });
}
