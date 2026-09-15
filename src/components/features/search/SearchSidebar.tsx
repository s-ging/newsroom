'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { NestedCheckbox } from './NestedCheckbox';
import {
  INDUSTRY_HIERARCHY,
  REGION_HIERARCHY,
  getAllDescendantIds,
  findItemInHierarchy,
  getAncestorIds,
  getLeafIds,
} from '@/lib/filter-data';
import { LANGUAGES as LANGUAGE_REGISTRY } from '@/lib/languages';
import { LanguageTag } from '@/components/shared/LanguageTag';

// Derived from the language registry so the filter codes, the labels and the
// tags rendered on results can never drift apart.
const LANGUAGES = LANGUAGE_REGISTRY.map((l) => ({
  code: l.searchCode,
  label: l.label,
  id: l.id,
}));

interface SearchSidebarProps {
  activeSectors: string[];
  activeLanguages: string[];
  activeRegions: string[];
  currentQ: string;
  currentLimit: string;
}

export function SearchSidebar({
  activeSectors,
  activeLanguages,
  activeRegions,
  currentQ,
  currentLimit,
}: SearchSidebarProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Every facet here navigates, and sector browse behind it is a LIVE call to
  // /api/Articles/by-industry per selected sector. Two things were wrong with
  // ticking a box before this:
  //
  //   1. Nothing on screen changed for the whole round trip. /search?sec=... is
  //      the same route segment, so search/loading.tsx never fires.
  //   2. The checkbox itself did not even tick. Its checked state is derived
  //      from the URL via props, and the URL does not change until the server
  //      has answered - so the one control the reader just clicked appeared to
  //      ignore them, which is what makes people click it again.
  //
  // useOptimistic fixes (2): the box ticks on click and reverts only if the
  // navigation resolves to something else. useTransition fixes (1): isPending
  // dims the panel so it is visibly working rather than visibly ignoring you.
  const [isPending, startTransition] = useTransition();
  const [optimisticSectors, setOptimisticSectors] = useOptimistic(activeSectors);
  const [optimisticLanguages, setOptimisticLanguages] = useOptimistic(activeLanguages);
  const [optimisticRegions, setOptimisticRegions] = useOptimistic(activeRegions);

  const buildUrl = (sectors: string[], languages: string[], regions: string[]) => {
    const params = new URLSearchParams();
    if (currentQ) params.set('q', currentQ);
    sectors.forEach((s) => params.append('sec', s));
    languages.forEach((l) => params.append('lang', l));
    regions.forEach((r) => params.append('reg', r));
    if (currentLimit && currentLimit !== '20') params.set('limit', currentLimit);
    return `/search?${params.toString()}`;
  };

  // Sector toggle: parent IDs are never stored in the URL.
  // ON  + parent → expand to all leaf children (exact sector names for precise filtering).
  // ON  + leaf   → strip ancestors, add leaf.
  // OFF + parent → remove all leaf descendants.
  // OFF + leaf   → remove leaf; if an ancestor was in URL expand it minus this leaf.
  function applySectorToggle(current: string[], id: string, checked: boolean): string[] {
    const item = findItemInHierarchy(INDUSTRY_HIERARCHY, id);
    const descendantIds = item ? getAllDescendantIds(item) : [];
    const ancestorIds = getAncestorIds(id, INDUSTRY_HIERARCHY);
    const idsToAdd = item?.children?.length ? getLeafIds(item) : [id];

    let next = [...current];
    if (checked) {
      next = next.filter((v) => !descendantIds.includes(v) && !ancestorIds.includes(v));
      idsToAdd.forEach((leafId) => { if (!next.includes(leafId)) next.push(leafId); });
    } else {
      const idsToRemove = new Set([id, ...descendantIds]);
      next = next.filter((v) => !idsToRemove.has(v));
      // Expand any ancestor that was in the URL (legacy ?sec=Communications support)
      const closestFirst = [...ancestorIds].reverse();
      for (const ancestorId of closestFirst) {
        if (next.includes(ancestorId)) {
          const ancestorItem = findItemInHierarchy(INDUSTRY_HIERARCHY, ancestorId);
          if (ancestorItem) {
            next = next.filter((v) => v !== ancestorId);
            getLeafIds(ancestorItem).forEach((leafId) => {
              if (!idsToRemove.has(leafId) && !next.includes(leafId)) next.push(leafId);
            });
          }
          break;
        }
      }
    }
    return next;
  }

  // Region toggle: parent IDs ARE stored (compact representation: ?reg=Asia vs many countries).
  // ON  → strip ancestors and descendants, add item.
  // OFF → strip item and descendants; expand closest ancestor in URL minus this branch.
  function applyRegionToggle(current: string[], id: string, checked: boolean): string[] {
    const item = findItemInHierarchy(REGION_HIERARCHY, id);
    const descendantIds = item ? getAllDescendantIds(item) : [];
    const ancestorIds = getAncestorIds(id, REGION_HIERARCHY);

    let next = [...current];
    if (checked) {
      next = next.filter((v) => !descendantIds.includes(v) && !ancestorIds.includes(v));
      if (!next.includes(id)) next.push(id);
    } else {
      const idsToRemove = new Set([id, ...descendantIds]);
      next = next.filter((v) => !idsToRemove.has(v));
      const closestFirst = [...ancestorIds].reverse();
      for (const ancestorId of closestFirst) {
        if (next.includes(ancestorId)) {
          const ancestorItem = findItemInHierarchy(REGION_HIERARCHY, ancestorId);
          if (ancestorItem) {
            next = next.filter((v) => v !== ancestorId);
            getLeafIds(ancestorItem).forEach((leafId) => {
              if (!idsToRemove.has(leafId) && !next.includes(leafId)) next.push(leafId);
            });
          }
          break;
        }
      }
    }
    return next;
  }

  const handleSectorToggle = (id: string, checked: boolean) => {
    const next = applySectorToggle(activeSectors, id, checked);
    startTransition(() => {
      setOptimisticSectors(next);
      router.push(buildUrl(next, activeLanguages, activeRegions));
    });
  };

  const handleLanguageChange = (code: string, checked: boolean) => {
    const next = checked
      ? [...activeLanguages, code]
      : activeLanguages.filter((l) => l !== code);
    startTransition(() => {
      setOptimisticLanguages(next);
      router.push(buildUrl(activeSectors, next, activeRegions));
    });
  };

  const handleRegionToggle = (id: string, checked: boolean) => {
    const next = applyRegionToggle(activeRegions, id, checked);
    startTransition(() => {
      setOptimisticRegions(next);
      router.push(buildUrl(activeSectors, activeLanguages, next));
    });
  };

  const filterContent = (
    // Dimmed, not disabled, while a facet navigation is in flight: the reader
    // can still queue another tick (React coalesces the transitions), they just
    // get told the results behind them are stale.
    <div
      aria-busy={isPending}
      className={`space-y-6 mt-3 transition-opacity ${isPending ? 'opacity-60' : 'opacity-100'}`}
    >
      {/* Sectors */}
      <div>
        <h3 className="text-sm font-medium text-black">Sector / Industry</h3>
        <div className="mt-2 space-y-0.5">
          {INDUSTRY_HIERARCHY.map((item) => (
            <NestedCheckbox
              key={item.id}
              item={item}
              selectedIds={optimisticSectors}
              onToggle={handleSectorToggle}
              level={0}
            />
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <h3 className="text-sm font-medium text-black">Language</h3>
        <ul className="space-y-2.5 mt-2">
          {LANGUAGES.map(({ code, label, id }) => (
            <li key={code} className="flex items-center justify-between gap-2">
              <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer hover:text-gray-900 select-none">
                <input
                  type="checkbox"
                  checked={optimisticLanguages.includes(code)}
                  onChange={(e) => handleLanguageChange(code, e.target.checked)}
                  className="w-4 h-4 border-gray-300 accent-[#2088c9] cursor-pointer"
                />
                {label}
              </label>
              <LanguageTag value={id} />
            </li>
          ))}
        </ul>
      </div>

      {/* Region */}
      <div>
        <h3 className="text-sm font-medium text-black">Region</h3>
        <div className="mt-2 space-y-0.5">
          {REGION_HIERARCHY.map((item) => (
            <NestedCheckbox
              key={item.id}
              item={item}
              selectedIds={optimisticRegions}
              onToggle={handleRegionToggle}
              level={0}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile: button + accordion, closed by default */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="button alt flex items-center justify-between w-full gap-2 text-sm"
          aria-expanded={mobileOpen}
          aria-controls="search-filter-mobile"
        >
          <span>Filter Results</span>
          <svg
            className={`w-4 h-4 transition-transform duration-150 ${mobileOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {mobileOpen && (
          <div
            id="search-filter-mobile"
            className="mt-2 p-4 border border-gray-200 rounded-md bg-white"
          >
            {filterContent}
          </div>
        )}
      </div>

      {/* Desktop: always visible */}
      <div className="hidden md:block">
        <h2 className="text-sm font-medium text-black">Filter Results</h2>
        {filterContent}
      </div>
    </>
  );
}
