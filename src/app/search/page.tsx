import { searchArticles } from '@/services/search';
import { SectorSidebar } from '@/components/search/SectorSidebar';
import { SearchResults } from '@/components/search/SearchResults';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    sector?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const q = (params.q ?? '').trim();
  const sectorParam = params.sector ?? '';
  const page = Math.max(1, parseInt(params.page ?? '1', 10));
  const limit = Math.max(1, parseInt(params.limit ?? '20', 10));

  const activeSectors = sectorParam
    ? sectorParam.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const { articles, total } = searchArticles(q, activeSectors, page, limit);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-[2.5fr_7.5fr] gap-8">
        <aside>
          <SectorSidebar
            activeSectors={activeSectors}
            currentQ={q}
            currentLimit={params.limit ?? ''}
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
