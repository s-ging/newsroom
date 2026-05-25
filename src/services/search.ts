import articles from '@/data/prefetched-articles.json';
import { getArticleCategories } from '@/lib/sector-mapper';

// Sidebar display names → actual sector_type values used by getArticleCategories()
const DISPLAY_TO_TYPE: Record<string, string> = {
  Cryptocurrency: 'CryptoCurrency',
  Finance: 'Financial',
  Healthcare: 'Medicine',
  Industry: 'Industrial',
  Environment: 'Sustainability',
};

// Sector_type values → sidebar display names (for badges)
const TYPE_TO_DISPLAY: Record<string, string> = {
  CryptoCurrency: 'Cryptocurrency',
  Financial: 'Finance',
  Medicine: 'Healthcare',
  Industrial: 'Industry',
  Sustainability: 'Environment',
};

export function getSectorDisplayName(sectorType: string): string {
  return TYPE_TO_DISPLAY[sectorType] ?? sectorType;
}

interface PrefetchedArticle {
  id: number;
  headline: string;
  dateTime: string;
  thumbImage: string | null;
  bigImage: string | null;
  summary: string;
  companyName: string | null;
  companyLogo: string | null;
  companyId: string | null;
  sectors: string[];
  sectorMappings: Array<{ name: string; type: string }>;
  primarySector: string | null;
  primarySectorType: string | null;
  rawLanguage: string;
  rawSource: string;
  location: string;
}

export interface SearchResult {
  id: number;
  headline: string;
  dateTime: string;
  thumbImage: string | null;
  description: string | null;
  companyName: string;
  companyLogo: string | null;
  sectors: string[];
}

export function searchArticles(
  q: string,
  activeSectors: string[],
  page: number,
  limit: number,
): { articles: SearchResult[]; total: number } {
  const raw = articles as unknown as PrefetchedArticle[];
  const qLower = q.toLowerCase();
  const sectorTypes = activeSectors.map((s) => DISPLAY_TO_TYPE[s] ?? s);

  const filtered = raw.filter((article) => {
    const matchesQuery =
      !q ||
      article.headline.toLowerCase().includes(qLower) ||
      (article.summary ?? '').toLowerCase().includes(qLower);

    const matchesSector =
      sectorTypes.length === 0 ||
      getArticleCategories(article.sectors).some((cat) => sectorTypes.includes(cat));

    return matchesQuery && matchesSector;
  });

  const total = filtered.length;
  const start = (page - 1) * limit;

  return {
    articles: filtered.slice(start, start + limit).map((a) => ({
      id: a.id,
      headline: a.headline,
      dateTime: a.dateTime,
      thumbImage: a.thumbImage,
      description: a.summary
        ? a.summary
            .replace(/<[^>]*>/g, '')
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .trim()
            .slice(0, 200)
        : null,
      companyName: a.companyName ?? '',
      companyLogo: a.companyLogo ?? null,
      sectors: a.sectors ?? [],
    })),
    total,
  };
}
