// components/nav/MainNav/Company/index.tsx
'use client'

import Link from 'next/link'

interface MenuProps {
  onClose?: () => void
}

// Types and constants
const REGIONS = [
  { 
    title: 'Recent', 
    links: ['One', 'Two', 'Three', 'Four', 'Five'].map(item => ({ label: item, href: '#' }))
  },
  { 
    title: 'China', 
    links: ['One', 'Two', 'Three', 'Four', 'Five'].map(item => ({ label: item, href: '#' }))
  },
  { 
    title: 'Hong Kong', 
    links: ['One', 'Two', 'Three', 'Four', 'Five'].map(item => ({ label: item, href: '#' }))
  },
  { 
    title: 'Indonesia', 
    links: ['One', 'Two', 'Three', 'Four', 'Five'].map(item => ({ label: item, href: '#' }))
  },
  { 
    title: 'Japan', 
    links: ['One', 'Two', 'Three', 'Four', 'Five'].map(item => ({ label: item, href: '#' }))
  },
  { 
    title: 'Malaysia', 
    links: ['One', 'Two', 'Three', 'Four', 'Five'].map(item => ({ label: item, href: '#' }))
  },
  { 
    title: 'Singapore', 
    links: ['One', 'Two', 'Three', 'Four', 'Five'].map(item => ({ label: item, href: '#' }))
  },
]

const ALPHABET = ['#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')]

export default function CompanyMenu({ onClose }: MenuProps) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 lg:gap-4">
        {REGIONS.map((region) => (
          <div key={region.title} className="min-w-35">
            <p className="dropdown-link label mb-3">
              {region.title}
            </p>
            <div className="space-y-3">
              {region.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block dropdown-link"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 mt-6">
        <p className="dropdown-link label">
          By Name:
        </p>
        <div className="inline-flex flex-wrap gap-1">
          {ALPHABET.map((letter) => (
            <Link
              key={letter}
              href="#"
              className="dropdown-link"
              onClick={onClose}
            >
              {letter}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}