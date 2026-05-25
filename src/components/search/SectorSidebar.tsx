'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DISPLAY_SECTORS } from '@/lib/sector-mapper';

// Actual sector_type values → friendly display labels used in sidebar and URLs
const SECTOR_LABELS: Record<string, string> = {
  CryptoCurrency: 'Cryptocurrency',
  Financial: 'Finance',
  Industrial: 'Industry',
  Medicine: 'Healthcare',
  Sustainability: 'Environment',
};

function sectorLabel(sectorType: string): string {
  return SECTOR_LABELS[sectorType] ?? sectorType;
}

interface SectorSidebarProps {
  activeSectors: string[];
  currentQ: string;
  currentLimit: string;
}

export function SectorSidebar({ activeSectors, currentQ, currentLimit }: SectorSidebarProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSectorChange = (label: string, checked: boolean) => {
    const next = checked
      ? [...activeSectors, label]
      : activeSectors.filter((s) => s !== label);

    const params = new URLSearchParams();
    if (currentQ) params.set('q', currentQ);
    if (next.length > 0) params.set('sector', next.join(','));
    if (currentLimit && currentLimit !== '20') params.set('limit', currentLimit);
    router.push(`/search?${params.toString()}`);
  };

  const checkboxList = (
    <ul className="space-y-2.5 mt-3">
      {DISPLAY_SECTORS.map((sectorType) => {
        const label = sectorLabel(sectorType);
        return (
          <li key={sectorType}>
            <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer hover:text-gray-900 select-none">
              <input
                type="checkbox"
                checked={activeSectors.includes(label)}
                onChange={(e) => handleSectorChange(label, e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-[#2088c9] cursor-pointer"
              />
              {label}
            </label>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile: button + accordion, closed by default */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="button alt flex items-center justify-between w-full gap-2 text-sm"
          aria-expanded={mobileOpen}
          aria-controls="sector-filter-mobile"
        >
          <span>Filter by Sector</span>
          <svg
            className={`w-4 h-4 transition-transform duration-150 ${mobileOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {mobileOpen && (
          <div
            id="sector-filter-mobile"
            className="mt-2 p-4 border border-gray-200 rounded-md bg-white"
          >
            {checkboxList}
          </div>
        )}
      </div>

      {/* Desktop: always visible */}
      <div className="hidden md:block">
        <h2 className="text-xs font-medium text-black">
          Filter by Sector
        </h2>
        {checkboxList}
      </div>
    </>
  );
}
