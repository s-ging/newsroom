'use client';

// app/error.tsx
//
// The last-resort boundary. Most routes here never reach it - the services
// swallow a failed fetch and degrade to an empty feed, and the article and
// company routes call notFound() - which is precisely why it is worth having:
// anything that DOES throw is unexpected, and Next's default error screen
// tells a reader nothing and offers them nothing to do.
//
// The retry matters more than the wording. Next does not cache a failed
// response (see lib/api-timeout), so reset() genuinely re-attempts the fetch
// rather than replaying the same failure - and by far the likeliest cause of
// landing here is a request that hit the 6s deadline on a slow connection.

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[newsroom] unhandled render error', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl min-h-125">
      <div className="max-w-xl py-16">
        <h1 className="text-3xl tracking-tight text-black mb-4">
          This page didn&rsquo;t load
        </h1>
        <p className="text-[15px] leading-relaxed text-gray-600 mb-8">
          Something went wrong while fetching this page. It is usually
          temporary — trying again is worth a shot.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={reset} className="button">
            Try again
          </button>
          <Link href="/" className="button alt inline-flex items-center">
            Back to the newsroom
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-xs text-gray-400">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
