'use client'

import Link from 'next/link'
import { SECTOR_TYPES } from '@/lib/sectors'

interface SectorMenuProps {
  onClose?: () => void
}

function toSectionParam(item: string): string {
  return item
    .replace(/\[/g, '%5B')
    .replace(/\]/g, '%5D')
    .replace(/&/g, '%26')
    .replace(/ /g, '+')
}

export default function SectorMenu({ onClose }: SectorMenuProps) {
  return (
    <div className="grid grid-cols-9 gap-6">
      {SECTOR_TYPES.map((sector) => (
        <div key={sector} className="dropdown-menu-section">
          <p className="megamenu-title">
            <Link
              href={`/search?sec=${toSectionParam(sector)}`}
              className="dropdown-link"
              onClick={onClose}
            >
              {sector}
            </Link>
          </p>
        </div>
      ))}
    </div>
  )
}
