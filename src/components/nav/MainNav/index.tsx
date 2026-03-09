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
        <div className="flex items-center justify-between h-16 lg:h-20">
          
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
          <div className="hidden lg:block flex-1 max-w-xl xl:max-w-2xl mx-6">
            <form 
              action="/search" 
              method="GET"
              className="relative"
            >
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
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              if (item.label === 'Login') {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-button alt mr-1.5"
                  >
                    {item.label}
                  </Link>
                )
              }
              if (item.label === 'Register') {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-button"
                  >
                    {item.label}
                  </Link>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${
                    pathname === item.href ? 'active' : ''
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
      </div> {/* This closes the container mx-auto px-4 */}

          {/* Desktop Mega Menu - new row below */}
          <div ref={megaMenuRef} className="hidden lg:block border-t border-gray-200">
            <div>
              <MegaMenuNav 
                activeMenu={activeMegaMenu}
                onMenuHover={(menu) => {
                  if (menu) {
                    if (activeMegaMenu && activeMegaMenu !== menu) {
                      // Switching - only fade content
                      setIsSwitching(true)
                      setTimeout(() => {
                        setActiveMegaMenu(menu)
                        setTimeout(() => setIsSwitching(false), 75)
                      }, 75)
                    } else {
                      // Opening fresh
                      setActiveMegaMenu(menu)
                    }
                  } else {
                    // Closing - fade container
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
        </div>

      {/* Mobile Menu - full screen overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-999 overflow-y-auto mt-9">
          <div className="p-4">
            {/* Mobile header with close */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Search */}
            <div className="mb-6">
              <form 
                action="/search" 
                method="GET"
                className="relative"
                onSubmit={() => setIsOpen(false)}
              >
                <input
                  type="search"
                  name="q"
                  placeholder="Search..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Mobile Nav Items */}
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                // Special styling for login/register in mobile
                if (item.label === 'Login') {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-3 text-center text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition"
                    >
                      {item.label}
                    </Link>
                  )
                }
                if (item.label === 'Register') {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-3 text-center text-white bg-gray-900 border border-transparent rounded-full hover:bg-gray-800 transition mt-2"
                    >
                      {item.label}
                    </Link>
                  )
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-4 text-base border-b border-gray-100 transition ${
                      pathname === item.href
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Optional: Add language selector or other mobile-only items here */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                © {new Date().getFullYear()} ACN Newswire
              </p>
            </div>
          </div>
        </div>
      )}
      {activeMegaMenu && (
        <div 
          className={`fixed bottom-9 left-1/2 -translate-x-1/2 z-[100] transition-all duration-200 ${
          isContainerClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          <button
            onClick={closeMenu}
            className="flex flex-row justify-between nav-button alt opacity-60 w-32"
          >
            <span className="font-bold">✕</span> Close Menu
          </button>
        </div>
      )}

    </nav>

    
  )
}