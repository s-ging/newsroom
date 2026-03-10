// components/nav/MainNav.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import logo from '../../../app/logo.svg';
import "./MainNav.css";
import MegaMenuNav from './MegaMenuNav';

const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Login', href: '/login', desktopOnly: true },
  { label: 'Register', href: '/register', desktopOnly: true }
]

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [isContainerClosing, setIsContainerClosing] = useState(false) // For final close
  const [isSwitching, setIsSwitching] = useState(false) // For menu transitions
  const megaMenuRef = useRef<HTMLDivElement>(null)

  const closeMenu = () => {
    // Start closing the container
    setIsContainerClosing(true)
    
    setTimeout(() => {
      // Remove the menu entirely
      setActiveMegaMenu(null)
      // Reset both states
      setIsContainerClosing(false)
      setIsSwitching(false)
    }, 150) // Match animation duration
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-99">
      <div className="container mx-auto px-4">

        <div className="flex flex-row items-center h-16 lg:flex-col lg:h-auto">
          <div className="flex flex-row justify-between gap-4 py-3 w-full">
            {/* Logo - always visible */}
            <Link href="/" className="flex-shrink-0" aria-label="ACN Newswire homepage">
              <Image
                src={logo}
                alt=""
                width={100}
                height={32}
                className="h-8 w-[250px] lg:h-10"
                priority
              />
            </Link>

          
            {/* Desktop Search - lg and up */}
            <div className="hidden lg:flex flex-1 max-w-xl xl:max-w-2xl mx-6 self-center">
              <form action="/search" method="GET" className="relative w-full">
                <input
                  type="search"
                  name="q"
                  placeholder="News releases by Company, Region, Sector, Industry, Language & Event"
                  className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Submit search"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
            {/* Desktop Actions - lg and up */}
            <div className="hidden lg:flex items-center gap-1 self-center">
              {NAV_ITEMS.map((item) => {
                if (item.label === 'Login') {
                  return <Link key={item.href} href={item.href} className="nav-button alt mr-1.5">{item.label}</Link>
                }
                if (item.label === 'Register') {
                  return <Link key={item.href} href={item.href} className="nav-button">{item.label}</Link>
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Desktop Mega Menu - second row on lg */}
          <div ref={megaMenuRef} className="hidden lg:block border-t border-gray-200 w-full">
            <MegaMenuNav
              activeMenu={activeMegaMenu}
              onMenuHover={(menu) => {
                if (menu) {
                  if (activeMegaMenu && activeMegaMenu !== menu) {
                    setIsSwitching(true)
                    setTimeout(() => {
                      setActiveMegaMenu(menu)
                      setTimeout(() => setIsSwitching(false), 75)
                    }, 75)
                  } else {
                    setActiveMegaMenu(menu)
                  }
                } else {
                  setIsContainerClosing(true)
                  setTimeout(() => {
                    setActiveMegaMenu(null)
                    setIsContainerClosing(false)
                  }, 150)
                }
              }}
              isContainerClosing={isContainerClosing}
              isSwitching={isSwitching}
            />
          </div>

          {/* Mobile Menu Button - below lg */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -mr-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-md"
            aria-expanded={isOpen}
            aria-label="Menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div> {/* End of main flex row */}

        {/* Mobile Menu Overlay - outside the row div */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 bg-white z-999 overflow-y-auto mt-9">
            {/* ... rest of mobile menu unchanged ... */}
          </div>
        )}

        {activeMegaMenu && (
          <div
            className={`fixed bottom-9 left-1/2 -translate-x-1/2 z-[100] transition-all duration-200 ${
              isContainerClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <button onClick={closeMenu} className="flex flex-row justify-between nav-button alt opacity-60 w-32">
              <span className="font-bold">✕</span> Close Menu
            </button>
          </div>
        )}

      </div>
    </nav>
  )
}