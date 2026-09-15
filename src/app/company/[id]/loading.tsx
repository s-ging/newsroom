// app/company/[id]/loading.tsx
//
// The company page awaits the profile and the release feed together, and the
// profile itself is the heaviest service in the tree (services/company-profile
// is 486 lines of merge across several sources). It also degrades to a PARTIAL
// page rather than a 404 when the API is unreachable - so the wait here is
// routinely the full 6s deadline, not a fast failure.
//
// Feed rows are drawn without the logo column: the company page passes hideLogo
// (every release is from the same company, whose logo is already in the rail).

import { PressReleaseFeedSkeleton, SkeletonBlock, SkeletonPage } from '@/components/shared/Skeleton';
import { RAIL_WIDTH } from '@/components/shared/Rail';

export default function CompanyLoading() {
  return (
    // Shell copied verbatim from company/page.tsx, dead py-6 and all - see the
    // page_shells DIVERGENCE note in STYLING.toon. Matching the bug beats
    // silently fixing it here and having the two disagree.
    <SkeletonPage
      label="this company"
      className="container mx-auto px-4 py-8 max-w-7xl min-h-125 lg:px-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10">
        <div className="min-w-0 flex-1">
          <SkeletonBlock className="h-9 w-2/3 mb-3" />
          <SkeletonBlock className="h-4 w-40 mb-8" />
          <SkeletonBlock className="h-5 w-56 mb-4" />
          <PressReleaseFeedSkeleton count={6} logo={false} />
        </div>

        <div className={RAIL_WIDTH}>
          <div className="border border-gray-200 p-4">
            <SkeletonBlock className="h-20 w-40 mb-6" />
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="flex items-baseline justify-between gap-4 py-2.5">
                <SkeletonBlock className="h-3 w-20" />
                <SkeletonBlock className="h-3 w-28" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonPage>
  );
}
