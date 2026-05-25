import { PressReleaseItem } from '@/components/press-release/PressReleaseItem';
import { getArticleCategories } from '@/lib/sector-mapper';
import { getSectorDisplayName } from '@/services/search';
import type { SearchResult } from '@/services/search';
import { Pagination } from './Pagination';

interface SearchResultsProps {
  results: SearchResult[];
  totalResults: number;
  query: string;
  currentPage: number;
  limit: number;
}

export function SearchResults({
  results,
  totalResults,
  query,
  currentPage,
  limit,
}: SearchResultsProps) {
  const totalPages = Math.ceil(totalResults / limit);
  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">
        Showing{' '}
        <span className="font-semibold text-gray-700">{results.length}</span> of{' '}
        <span className="font-semibold text-gray-700">{totalResults}</span>{' '}
        result{totalResults !== 1 ? 's' : ''}
        {query && (
          <>
            {' '}for &ldquo;<span className="font-semibold text-gray-800">{query}</span>&rdquo;
          </>
        )}
      </p>

      {results.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-400 text-base">
            No results found{query ? ` for "${query}"` : ''}.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Try a different keyword or select a sector from the sidebar.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {results.map((article) => {
            const displayCategories = getArticleCategories(article.sectors).map(
              getSectorDisplayName,
            );
            return (
              <li key={article.id}>
                <PressReleaseItem
                  article={article}
                  companyName={article.companyName}
                  logoSrc={article.companyLogo}
                  sectors={displayCategories.length > 0 ? displayCategories : null}
                  showMeta
                />
              </li>
            );
          })}
        </ul>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
