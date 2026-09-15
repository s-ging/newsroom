// components/shared/Skeleton.tsx
//
// Primitives for the route-level loading.tsx skeletons.
//
// These exist because every page in this app waits on the API, and until now
// there was no loading boundary anywhere in src/app. Without one a navigation
// blocks: the browser sits on the OLD page, unchanged and with no spinner, for
// as long as the fetch takes - up to API_TIMEOUT_MS (6s), longer still on the
// home page, which sweeps the events list. That reads as a frozen site rather
// than a loading one, which is the whole bug.
//
// Kept deliberately dumb: no 'use client', no state, no JS. A skeleton that
// needed hydration to appear would arrive at the same moment as the content it
// is standing in for, which defeats the point of having one.
//
// The pulse lives on the WRAPPER (SkeletonPage), not on each block, so a screen
// breathes as one surface instead of a hundred out-of-phase ones - and so the
// animation costs one compositor layer rather than dozens.

import type { ReactNode } from 'react';

/**
 * One grey block. The caller sizes it; everything else is fixed so skeletons
 * across the site cannot drift into different greys.
 */
export function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div aria-hidden className={`rounded bg-gray-200 ${className}`} />;
}

/**
 * Stacked text bars. The last one is short, the way a real ragged paragraph
 * edge is - a block of equal-length bars reads as a table, not as prose.
 */
export function SkeletonText({
  lines = 2,
  className = '',
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={`h-3 rounded bg-gray-200 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

/**
 * The shell every loading.tsx wraps itself in.
 *
 * Carries the pulse, and carries the accessibility contract in one place:
 * role="status" + aria-busy announces the wait once, and the blocks themselves
 * are aria-hidden so a screen reader hears "Loading <page>" rather than being
 * read a hundred empty divs.
 *
 * `className` takes the route's OWN page-shell string, copied verbatim from the
 * page it stands in for - see STYLING.toon page_shells. Matching it is what
 * stops the layout jumping when the real content swaps in.
 */
export function SkeletonPage({
  label,
  className = '',
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div role="status" aria-busy="true" className={`animate-pulse ${className}`}>
      <span className="sr-only">Loading {label}</span>
      {children}
    </div>
  );
}

/**
 * One row of a press-release feed, mirroring shared/PressReleaseItem: the w-28
 * logo column, its divider, the text column, the w-20 press photo. Used by
 * /news, /search, /company and the event release list, which all render that
 * same row.
 *
 * `logo` is off by default because the feeds that hide the logo column
 * (company) outnumber the ones that show it at any given moment on screen.
 */
export function PressReleaseItemSkeleton({ logo = true }: { logo?: boolean }) {
  return (
    <div className="flex items-stretch gap-0 py-3">
      {logo && (
        <>
          <div className="w-28 shrink-0 flex items-center justify-center p-3">
            <SkeletonBlock className="h-12 w-20" />
          </div>
          <div aria-hidden className="w-px bg-gray-200 shrink-0 self-stretch mx-1" />
        </>
      )}

      <div className="flex-1 min-w-0 px-4 py-2 flex flex-col justify-center gap-2">
        <SkeletonBlock className="h-4 w-3/4" />
        <div className="flex flex-row items-center gap-2">
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="h-3 w-20" />
        </div>
        <SkeletonText lines={2} />
      </div>

      <div className="shrink-0 ml-4 self-center">
        <SkeletonBlock className="h-20 w-20" />
      </div>
    </div>
  );
}

/** `count` feed rows, divided the way every real feed on the site is. */
export function PressReleaseFeedSkeleton({
  count = 6,
  logo = true,
}: {
  count?: number;
  logo?: boolean;
}) {
  return (
    <div className="divide-y divide-gray-100">
      {Array.from({ length: count }, (_, i) => (
        <PressReleaseItemSkeleton key={i} logo={logo} />
      ))}
    </div>
  );
}
