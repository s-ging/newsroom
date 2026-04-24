'use client'

import Link from 'next/link'

interface SectorMenuProps {
  onClose?: () => void
}

// Types and constants
const SECTORS = [
  { name: 'Business', href: '/sector/business' },
  { name: 'Communications', href: '/sector/communications' },
  { name: 'Cryptocurrency', href: '/sector/cryptocurrency' },
  { name: 'Finance', href: '/sector/finance' },
  { name: 'Healthcare', href: '/sector/healthcare' },
  { name: 'Industry', href: '/sector/industry' },
  { name: 'Lifestyle', href: '/sector/lifestyle' },
  { name: 'Technology', href: '/sector/technology' },
]


export default function SectorMenu({ onClose }: SectorMenuProps) {
  return (
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-4">
          {SECTORS.map((sector) => (
            <div key={sector.name} className="dropdown-menu-section">
              <p className="megamenu-title">
                <Link 
                  href={sector.href}
                  className="dropdown-link"
                  onClick={onClose}
                >
                  {sector.name}
                </Link>
              </p>
            </div>
          ))}
        </div>
  )
}