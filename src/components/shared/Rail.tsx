// components/shared/Rail.tsx
//
// The right-hand rail, shared by /company/[id], /article/* and both event
// detail pages.
//
// The two rails had drifted into visibly different products — 340px vs 280px
// wide, 20px section headings vs 11px, text-sm rows at py-2.5 vs text-xs rows
// at py-1. Everything dimensional now lives here so they stay one family.
//
// `Rail` is the <aside> shell every one of them used to hand-roll. The two
// booleans are the ONLY differences that existed between those four copies:
//
//   <Rail sticky>          company  — pins the rail, which there IS the page
//   <Rail sticky bordered> article  — pins it and rules it off from the release
//   <Rail>                 events   — scrolls with the page, no rule
//
// They still differ in one more way, deliberately: the company rail wraps its
// sections in a card (`boxed`), because there the rail *is* the page. The
// article rail is borderless so nothing competes with the release headline.

import type { ReactNode } from 'react';

/** Both rails, same column width. */
export const RAIL_WIDTH = 'w-full lg:w-[320px] lg:shrink-0';

export const RAIL_PILL =
  'inline-flex items-center rounded px-2 py-1 text-xs leading-none transition-colors';

export const RAIL_LINK = 'text-[#2088c9] hover:underline break-words';

interface RailProps {
  /** Pins the rail alongside a scrolling main column. */
  sticky?: boolean;
  /** Vertical rule separating the rail from the column to its left. */
  bordered?: boolean;
  children: ReactNode;
}

/**
 * The rail shell. When neither flag is set no wrapper div is emitted at all —
 * that keeps the event rails byte-identical to the markup they had before this
 * component existed.
 */
export function Rail({ sticky, bordered, children }: RailProps) {
  const inner = [
    sticky && 'lg:sticky lg:top-6',
    bordered && 'lg:border-l lg:border-gray-200 lg:pl-6',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={RAIL_WIDTH}>
      {inner ? <div className={inner}>{children}</div> : children}
    </aside>
  );
}

/** Small-caps section label. The only heading style either rail uses. */
export function RailLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
      {children}
    </h2>
  );
}

interface RailSectionProps {
  title?: string;
  /** Wraps the body in the bordered card used on the company rail. */
  boxed?: boolean;
  children: ReactNode;
}

export function RailSection({ title, boxed, children }: RailSectionProps) {
  const body = boxed ? (
    <div className="rounded-md border border-gray-200 bg-gray-50/60 px-3.5 py-2.5">
      {children}
    </div>
  ) : (
    children
  );

  return (
    <section
      className={
        boxed
          ? 'mb-6'
          : 'border-t border-gray-200 pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0'
      }
    >
      {title && <RailLabel>{title}</RailLabel>}
      {body}
    </section>
  );
}

interface RailRowProps {
  label: string;
  value?: ReactNode;
  /** Stacks the value under the label — for addresses and other long values. */
  block?: boolean;
  /** Hairline rule under the row. Used inside boxed sections. */
  divided?: boolean;
}

export function RailRow({ label, value, block, divided }: RailRowProps) {
  if (value === null || value === undefined || value === '') return null;

  const divider = divided ? 'border-b border-gray-200 last:border-b-0' : '';

  if (block) {
    return (
      <div className={`py-1.5 ${divider}`}>
        <dt className="text-xs text-gray-500 mb-1">{label}</dt>
        <dd className="text-xs text-gray-800 leading-relaxed">{value}</dd>
      </div>
    );
  }

  return (
    <div className={`flex items-start justify-between gap-3 py-1.5 ${divider}`}>
      <dt className="text-xs text-gray-500 shrink-0">{label}</dt>
      <dd className="text-xs text-gray-800 text-right min-w-0 break-words">{value}</dd>
    </div>
  );
}

export function RailExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`text-xs ${RAIL_LINK}`}>
      {children}
    </a>
  );
}
