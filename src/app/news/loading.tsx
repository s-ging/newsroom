// app/news/loading.tsx
import { PressReleaseFeedSkeleton, SkeletonBlock, SkeletonPage } from '@/components/shared/Skeleton';

export default function NewsLoading() {
  return (
    // Shell copied verbatim from news/page.tsx - STYLING.toon page_shells CANONICAL.
    <SkeletonPage label="press releases" className="container mx-auto px-4 py-6 max-w-7xl">
      <SkeletonBlock className="h-9 w-72 mb-8" />
      <PressReleaseFeedSkeleton count={8} />
    </SkeletonPage>
  );
}
