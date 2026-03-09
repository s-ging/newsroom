// components/nav/MainNav/MegaMenuNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MegaMenuItem } from './types'
import { DEFAULT_MEGA_MENU_ITEMS } from './types'

import Company from './Company'

import Sector from './Sector'

interface MegaMenuNavProps {
  items?: MegaMenuItem[]
  activeMenu?: string | null
  onMenuHover?: (menu: string | null) => void
  isClosing?: boolean
}

export default function MegaMenuNav({ 
  items = DEFAULT_MEGA_MENU_ITEMS,
  activeMenu,
  onMenuHover,
  isClosing
}: MegaMenuNavProps) {
  const pathname = usePathname()
  
  return (
    <>
      {/* Mega menu bar */}
      <div className="hidden lg:block border-t border-gray-200">
        <div>
          <div className="flex items-center gap-1">
            {items.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => onMenuHover?.(item.megaMenuContent || null)}
                className={`nav-link mega ${
                  index === 0 ? 'pl-0!' : ''
                } ${pathname === item.href ? '' : ''}`}
              > 
                {item.label}
                {item.hasDropdown && (
                  <span className="ml-1 inline-block"> </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Dropdown menu */}
      {activeMenu && (
        <div className={`absolute left-0 right-0 top-full transition-all duration-200 ${
          isClosing ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
        }`}>
          {activeMenu === 'company' && <Company onClose={() => onMenuHover?.(null)} />}
          {activeMenu === 'region' && <Region onClose={() => onMenuHover?.(null)} />}
          {activeMenu === 'sector' && <Sector onClose={() => onMenuHover?.(null)} />}
          {activeMenu === 'industry' && <Industry onClose={() => onMenuHover?.(null)} />}
        </div>
      )}
    </>
  )
}