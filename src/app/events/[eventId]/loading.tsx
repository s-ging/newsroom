// app/events/[eventId]/loading.tsx
//
// Both branches of this route wait on fetchEvent(), which reads the same full
// events sweep as the listing (there is no working /api/Events/{id} - see
// services/events.ts). So this boundary covers the curated slugs and the live
// numeric ids alike.
//
// The hero is drawn as a flat neutral band rather than guessing at the curated
// pages' heroGradient: a wrong gradient that then swaps is more jarring than a
// neutral one that fills in.

import { SkeletonBlock, SkeletonPage, SkeletonText } from '@/components/shared/Skeleton';
import { RAIL_WIDTH } from '@/components/shared/Rail';

export default function EventLoading() {
  return (
    <SkeletonPage label="this event">
      <div className="bg-gray-200">
        <div className="container mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="h-3 w-40 rounded bg-gray-300/70" />
          <div className="mt-6 h-10 w-full max-w-3xl rounded bg-gray-300/70" />
          <div className="mt-3 h-10 w-2/3 max-w-2xl rounded bg-gray-300/70" />
          <div className="mt-8 flex flex-col gap-x-10 gap-y-4 sm:flex-row">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-2 w-16 rounded bg-gray-300/70" />
                <div className="h-4 w-36 rounded bg-gray-300/70" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto min-h-125 max-w-7xl px-4 py-8 lg:px-8">
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="min-w-0 flex-1">
            <section className="mb-10">
              <SkeletonBlock className="h-7 w-56 mb-4" />
              <SkeletonText lines={4} />
            </section>
            <section className="mb-10">
              <SkeletonBlock className="h-7 w-48 mb-4" />
              <div className="divide-y divide-gray-200 border-t border-gray-200">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="flex flex-col gap-2 py-4">
                    <SkeletonBlock className="h-4 w-3/4" />
                    <SkeletonBlock className="h-3 w-32" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Matches <Rail> width so the main column does not reflow on swap. */}
          <div className={RAIL_WIDTH}>
            <SkeletonBlock className="h-32 w-full mb-6" />
            <SkeletonBlock className="h-80 w-full" />
          </div>
        </div>
      </div>
    </SkeletonPage>
  );
}
