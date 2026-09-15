'use client';

// components/shared/NavPending.tsx
//
// A spinner that shows while the <Link> it sits inside is navigating.
//
// This exists to cover the gap loading.tsx cannot. A loading boundary only
// fires when the route SEGMENT changes; a link that changes nothing but the
// query string - which is every pagination control on this site, and the search
// facets - re-renders the same segment and shows no fallback at all. So those
// were the clicks with the least feedback anywhere in the app: the button
// stayed exactly as it was while the server went off and fetched a page.
//
// useLinkStatus reads the pending state of the nearest enclosing Link, so this
// has to be rendered as a CHILD of that Link, not beside it:
//
//   <Link href={...}>Next <NavPending /></Link>
//
// The dot is width-stable (a fixed w-3) so a button does not resize the instant
// it is clicked.

import { useLinkStatus } from 'next/link';

export function NavPending({ className = '' }: { className?: string }) {
  const { pending } = useLinkStatus();

  return (
    <span
      aria-hidden={!pending}
      className={`inline-block w-3 shrink-0 text-center align-middle ${className}`}
    >
      {pending && (
        <span className="inline-block h-3 w-3 animate-spin rounded-full border border-current border-t-transparent align-middle" />
      )}
    </span>
  );
}
