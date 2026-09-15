// app/not-found.tsx
//
// The target of every notFound() call in the app - a bad article id, a company
// that does not exist, an event slug nobody published.
//
// Written in the same voice as error.tsx, and on the same page shell as every
// other route. It used to centre itself in a full-height flex box with a bold
// gray-900 heading and a blue-600 link, which made the one page a reader is
// most likely to hit look like it belonged to a different site.

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl min-h-125">
      <div className="max-w-xl py-16">
        <h1 className="text-3xl tracking-tight text-black mb-4">
          We couldn&rsquo;t find that page
        </h1>
        <p className="text-[15px] leading-relaxed text-gray-600 mb-8">
          The link may be out of date, or the release may have moved. The
          newsroom and the search page are both good places to pick the thread
          back up.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/" className="button inline-flex items-center">
            Back to the newsroom
          </Link>
          <Link href="/search" className="button alt inline-flex items-center">
            Search releases
          </Link>
        </div>
      </div>
    </div>
  );
}
