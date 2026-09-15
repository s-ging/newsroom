// app/events/loading.tsx
//
// /events is the single slowest listing: fetchEvents() sweeps the whole
// endpoint page by page (PAGE_SIZE 500, up to MAX_PAGES 20, SEQUENTIALLY) and
// nothing renders until the last page lands. On a cold unstable_cache entry
// that is seconds, and it was seconds of a motionless screen.

import { SkeletonBlock, SkeletonPage } from '@/components/shared/Skeleton';

function EventRowSkeleton() {
  return (
    <div className="flex items-stretch gap-0 py-4">
      <SkeletonBlock className="w-40 h-24 shrink-0 rounded-none" />
      <div aria-hidden className="w-px bg-gray-200 shrink-0 self-stretch mx-1" />
      <div className="flex-1 min-w-0 px-4 flex flex-col justify-center gap-2">
        <SkeletonBlock className="h-4 w-2/3" />
        <SkeletonBlock className="h-3 w-40" />
        <SkeletonBlock className="h-3 w-1/3" />
      </div>
      <div className="shrink-0 flex flex-col justify-center gap-2 pl-4">
        <SkeletonBlock className="h-8 w-44" />
        <SkeletonBlock className="h-8 w-44" />
      </div>
    </div>
  );
}

function EventSectionSkeleton({ rows }: { rows: number }) {
  return (
    <section className="mb-10">
      <SkeletonBlock className="h-5 w-40 mb-4" />
      <div className="divide-y divide-gray-100">
        {Array.from({ length: rows }, (_, i) => (
          <EventRowSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export default function EventsLoading() {
  return (
    <SkeletonPage label="events" className="container mx-auto px-4 py-6 max-w-7xl">
      <SkeletonBlock className="h-9 w-40 mb-8" />
      <EventSectionSkeleton rows={2} />
      <EventSectionSkeleton rows={5} />
    </SkeletonPage>
  );
}
