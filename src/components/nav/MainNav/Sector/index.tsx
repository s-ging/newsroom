'use client'

import Link from 'next/link'

interface SectorMenuProps {
  onClose?: () => void
}

// Types and constants
const SECTORS = [
  { name: 'Business', href: '/search?sec=Business' },
  { name: 'Communications', href: '/search?sec=Communications' },
  { name: 'Cryptocurrency', href: '/search?sec=Cryptocurrency' },
  { name: 'Environment', href: '/search?sec=Environment' },
  { name: 'Finance', href: '/search?sec=Finance' },
  { name: 'Healthcare', href: '/search?sec=Healthcare' },
  { name: 'Industry', href: '/search?sec=Industry' },
  { name: 'Lifestyle', href: '/search?sec=Lifestyle' },
  { name: 'Technology', href: '/search?sec=Technology' },
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