// app/search/loading.tsx
//
// Covers both modes the page renders - company lookup and sector browse. The
// sidebar is drawn because sector browse is the mode that actually waits on the
// API (company lookup reads the static index and is effectively instant), so
// the faceted layout is the one worth holding the space for.

import { PressReleaseFeedSkeleton, SkeletonBlock, SkeletonPage } from '@/components/shared/Skeleton';

export default function SearchLoading() {
  return (
    <SkeletonPage label="search results" className="container mx-auto px-4 py-6 max-w-7xl">
      <SkeletonBlock className="h-9 w-64 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-[2.5fr_7.5fr] gap-8">
        <aside className="flex flex-col gap-6">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <SkeletonBlock className="h-4 w-28" />
              {Array.from({ length: 5 }, (_, j) => (
                <SkeletonBlock key={j} className="h-3 w-full" />
              ))}
            </div>
          ))}
        </aside>
        <main>
          <PressReleaseFeedSkeleton count={6} />
        </main>
      </div>
    </SkeletonPage>
  );
}
