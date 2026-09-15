// components/features/home/HomeSkeletons.tsx
//
// The home page's placeholder shapes, shared by two consumers that must agree:
// app/loading.tsx (shown while the route itself is resolving) and the Suspense
// fallbacks inside app/page.tsx (shown while an individual row is still
// fetching). Duplicating them would let the two drift, and the drift would be
// visible - the second set replaces the first mid-paint.
//
// Feature-local by the BIBLE tier test: /home is the only area that renders
// these shapes. The generic primitives they are built from live in
// shared/Skeleton.

import { SkeletonBlock, SkeletonText } from '@/components/shared/Skeleton';

/** HomeHero's two-up grid, held at its real md:h-[560px] so nothing jumps. */
export function HomeHeroSkeleton() {
  return (
    <section aria-hidden className="grid min-w-full animate-pulse grid-cols-1 md:grid-cols-[1fr_1fr]">
      <div className="aspect-[16/10] bg-gray-200 md:aspect-auto md:h-[560px]" />
      <div className="flex flex-col justify-center bg-[#fafafa] px-8 py-12 md:px-16">
        <SkeletonBlock className="h-8 w-full" />
        <SkeletonBlock className="mt-3 h-8 w-4/5" />
        <SkeletonText lines={3} className="mt-6 mb-10" />
        <SkeletonBlock className="h-10 w-40" />
      </div>
    </section>
  );
}

/**
 * The horizontal card row shared by EventsRow and CategoryRow - same section
 * padding, same gap-6, same card width clamp.
 *
 * `title` is passed when it is already known (the category rows know their own
 * heading before the fetch resolves), so the heading can be REAL text while
 * only the cards are grey. A row that can show its title should: it tells the
 * reader what is loading instead of making them wait to find out.
 */
export function HomeCardRowSkeleton({ title, cards = 5 }: { title?: string; cards?: number }) {
  return (
    <section className="mx-auto max-w-[1920px] animate-pulse px-12 py-16">
      <div className="mb-8 flex items-center justify-between">
        {title ? (
          <h2 className="text-3xl tracking-tight text-black">{title}</h2>
        ) : (
          <SkeletonBlock className="h-8 w-56" />
        )}
        <SkeletonBlock className="h-10 w-36" />
      </div>
      <div aria-hidden className="flex items-start gap-6 overflow-hidden">
        {Array.from({ length: cards }, (_, i) => (
          <div key={i} className="flex w-[clamp(18rem,calc(25vw-2rem),28rem)] shrink-0 flex-col">
            <SkeletonBlock className="mb-4 aspect-16/7 w-full" />
            <SkeletonBlock className="mb-3 h-4 w-11/12" />
            <SkeletonBlock className="mb-2 h-3 w-1/2" />
            <SkeletonBlock className="h-3 w-24" />
          </div>
        ))}
      </div>
    </section>
  );
}

/** FeaturedReleases' 0.6fr / 0.2fr / 0.2fr band. */
export function HomeFeaturedSkeleton() {
  return (
    <section aria-hidden className="mx-auto max-w-[1920px] animate-pulse px-12 py-16">
      <div className="mb-8 flex items-center justify-between">
        <SkeletonBlock className="h-8 w-64" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '0.6fr 0.2fr 0.2fr', gap: '24px' }}>
        <div className="flex flex-col">
          <SkeletonBlock className="mb-4 aspect-[16/10] w-full" />
          <SkeletonBlock className="mb-3 h-6 w-11/12" />
          <SkeletonText lines={2} />
        </div>
        {Array.from({ length: 2 }, (_, col) => (
          <div key={col} className="flex flex-col gap-8">
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} className="flex flex-col">
                <SkeletonBlock className="mb-3 aspect-[16/10] w-full" />
                <SkeletonBlock className="mb-2 h-4 w-full" />
                <SkeletonBlock className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
