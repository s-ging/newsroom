// app/article/[...segments]/loading.tsx
//
// The article route is the most-clicked navigation on the site - every feed row
// on every page lands here - and it was the worst offender: fetchPressRelease
// waits on the primary API, then the page waits again on the related-articles
// and versions pair before rendering. A reader clicking a headline got no
// acknowledgement at all that the click had registered.
//
// Mirrors features/article/PressRelease: max-w-7xl shell, body column plus the
// bordered rail.

import { SkeletonBlock, SkeletonPage, SkeletonText } from '@/components/shared/Skeleton';
import { RAIL_WIDTH } from '@/components/shared/Rail';

export default function ArticleLoading() {
  return (
    <SkeletonPage
      label="this press release"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10">
        <article className="flex-1 min-w-0">
          <SkeletonBlock className="h-4 w-48 mb-6" />

          <SkeletonBlock className="h-9 w-full" />
          <SkeletonBlock className="h-9 w-4/5 mt-3" />

          <div className="flex items-center gap-3 mt-6 mb-8">
            <SkeletonBlock className="h-3 w-32" />
            <SkeletonBlock className="h-3 w-20" />
            <SkeletonBlock className="h-3 w-24" />
          </div>

          <SkeletonBlock className="aspect-[16/9] w-full mb-8" />

          {/* Paragraph-shaped rather than one long slab: an article body is the
              one place where the skeleton's shape actually tells the reader
              what is coming. */}
          <div className="flex flex-col gap-6">
            {Array.from({ length: 5 }, (_, i) => (
              <SkeletonText key={i} lines={4} />
            ))}
          </div>
        </article>

        <div className={RAIL_WIDTH}>
          <SkeletonBlock className="h-5 w-40 mb-4" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <SkeletonBlock className="h-3 w-full" />
                <SkeletonBlock className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonPage>
  );
}
