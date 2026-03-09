'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MegaMenuItem } from './types'
import { DEFAULT_MEGA_MENU_ITEMS } from './types'

import Company from './Company'
import Region from './Region'
import Sector from './Sector'
import Industry from './Industry'

interface MegaMenuNavProps {
  items?: MegaMenuItem[]
  activeMenu?: string | null
  onMenuHover?: (menu: string | null) => void
  isContainerClosing?: boolean
  isSwitching?: boolean
}

export default function MegaMenuNav({ 
  items = DEFAULT_MEGA_MENU_ITEMS,
  activeMenu,
  onMenuHover,
  isContainerClosing,
  isSwitching
}: MegaMenuNavProps) {
  const pathname = usePathname()
  const [menuHeight, setMenuHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // Measure content height when menu changes
  useEffect(() => {
    if (contentRef.current && activeMenu) {
      setMenuHeight(contentRef.current.scrollHeight)
    }
  }, [activeMenu])

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
        <div 
          className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg z-40 overflow-hidden"
          style={{
            height: isContainerClosing ? 0 : menuHeight,
            transition: 'height 75ms ease-in-out'
          }}
        >
          <div ref={contentRef}>
            <div className="container mx-auto px-4 py-6 relative">
              <div 
                className="transition-opacity duration-75"
                style={{ opacity: isContainerClosing ? 0 : (isSwitching ? 0 : 1) }}
              >
                {activeMenu === 'company' && <Company onClose={() => onMenuHover?.(null)} />}
                {activeMenu === 'region' && <Region onClose={() => onMenuHover?.(null)} />}
                {activeMenu === 'sector' && <Sector onClose={() => onMenuHover?.(null)} />}
                {activeMenu === 'industry' && <Industry onClose={() => onMenuHover?.(null)} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}