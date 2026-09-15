// app/events/[eventId]/press-releases/loading.tsx
//
// This route fans out one fetchPressRelease() per mapped article id in
// parallel, and each of those makes a second call to the legacy host - so its
// wait is the slowest of N releases, not the average.

import { PressReleaseFeedSkeleton, SkeletonBlock, SkeletonPage } from '@/components/shared/Skeleton';

export default function EventPressReleasesLoading() {
  return (
    <SkeletonPage label="event press releases" className="container mx-auto px-4 py-6 max-w-7xl">
      <SkeletonBlock className="h-9 w-96 max-w-full mb-8" />
      <PressReleaseFeedSkeleton count={5} />
    </SkeletonPage>
  );
}
