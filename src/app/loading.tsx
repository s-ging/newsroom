// app/loading.tsx
//
// The home route's loading boundary, and the fallback for any route that has
// not declared a closer one.
//
// Short by design: page.tsx streams each band behind its own Suspense
// boundary, so this shell is on screen only for the moment between the click
// and the first flush. Its job is to prove the click registered - which is
// exactly what the app did not do before this file existed.

import {
  HomeCardRowSkeleton,
  HomeHeroSkeleton,
} from '@/components/features/home/HomeSkeletons';

export default function HomeLoading() {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">Loading the newsroom</span>
      <HomeHeroSkeleton />
      <HomeCardRowSkeleton title="Events" />
      <HomeCardRowSkeleton />
    </div>
  );
}
