import { searchArticles } from '@/services/search';
import { SearchSidebar } from '@/components/search/SearchSidebar';
import { SearchResults } from '@/components/search/SearchResults';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  const q = ((params.q as string | undefined) ?? '').trim();
  const page = Math.max(1, parseInt((params.page as string | undefined) ?? '1', 10));
  const limit = Math.max(1, parseInt((params.limit as string | undefined) ?? '20', 10));

  // Sectors: new ?sec= param, fallback to legacy ?sector= (comma-separated)
  const sectors = params.sec
    ? toArray(params.sec)
    : (params.sector as string | undefined)
        ?.split(',')
        .map((s) => s.trim())
        .filter(Boolean) ?? [];

  // Languages: new ?lang= param, fallback to legacy ?language= (comma-separated)
  const languages = params.lang
    ? toArray(params.lang)
    : (params.language as string | undefined)
        ?.split(',')
        .map((s) => s.trim())
        .filter(Boolean) ?? [];

  // Regions: new ?reg= param only
  const regions = toArray(params.reg);

  const { articles, total } = searchArticles({ q, sectors, languages, regions, page, limit });

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <h1 className="text-3xl tracking-tight text-black mb-8">
        {q ? <>Search results for &ldquo;{q}&rdquo;</> : 'Search for anything and everything'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-[2.5fr_7.5fr] gap-8">
        <aside>
          <SearchSidebar
            activeSectors={sectors}
            activeLanguages={languages}
            activeRegions={regions}
            currentQ={q}
            currentLimit={(params.limit as string | undefined) ?? ''}
          />
        </aside>
        <main>
          <SearchResults
            results={articles}
            totalResults={total}
            query={q}
            currentPage={page}
            limit={limit}
          />
        </main>
      </div>
    </div>
  );
}
