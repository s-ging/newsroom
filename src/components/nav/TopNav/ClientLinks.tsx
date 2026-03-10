'use client'

import { useState } from 'react'
import type { ClientLink } from './types';

interface ClientLinksProps {
  links: ClientLink[];
}

export default function ClientLinks({ links }: ClientLinksProps) {
  const [isOpen, setIsOpen] = useState(false)
  const safeLinks = Array.isArray(links) ? links : [];
  
  return (
    <div className="nav-right">
      {/* Desktop view - normal links (shows above 1000px) */}
      <div className="hidden min-[1080px]:flex flex-row gap-3">
        {safeLinks.map((link) => (
          <a 
            key={link.id}
            href={link.href}
            className="text-gray-600 hover:text-gray-900 no-underline text-sm"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile/Tablet view - toggle button (shows below 1000px) */}
      <div className="flex min-[1080px]:hidden relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-6 h-6 text-gray-500 hover:text-gray-700 border-0 bg-transparent"
          aria-expanded={isOpen}
          aria-haspopup="true"
          type="button"
        >
          <svg 
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 mt-[30px] w-48 bg-white border border-gray-300 shadow-lg py-1 z-50">
            {safeLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}