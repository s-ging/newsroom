'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // router.push() into the same segment shows no loading.tsx fallback - only
  // the query string changed - and sector browse behind it is a live call to
  // /api/Articles/by-industry per selected sector. Without this the buttons sat
  // inert for the whole round trip and readers clicked them again.
  //
  // useTransition rather than NavPending because this control navigates
  // imperatively; useLinkStatus only reads an enclosing <Link>.
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    startTransition(() => {
      router.push(`/search?${params.toString()}`);
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div
      aria-busy={isPending}
      className="flex justify-center items-center gap-2 mt-8 pt-4 border-t border-gray-200"
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Previous
      </button>

      <span className="inline-flex items-center gap-2 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
        {/* Fixed-width slot so the row does not shift when it appears. */}
        <span aria-hidden className="inline-block w-3 text-center">
          {isPending && (
            <span className="inline-block h-3 w-3 animate-spin rounded-full border border-current border-t-transparent align-middle" />
          )}
        </span>
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  );
}
