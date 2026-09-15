// app/admin/loading.tsx
//
// Present so /admin does not inherit app/loading.tsx and flash a newsroom hero
// skeleton on its way to either the panel or a 404.

import { SkeletonBlock, SkeletonPage } from '@/components/shared/Skeleton';

export default function AdminLoading() {
  return (
    <SkeletonPage label="the admin panel" className="container mx-auto px-4 py-6 max-w-7xl">
      <SkeletonBlock className="h-8 w-48 mb-8" />
      <SkeletonBlock className="h-64 w-full" />
    </SkeletonPage>
  );
}
