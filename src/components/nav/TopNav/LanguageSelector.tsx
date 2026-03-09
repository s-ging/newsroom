// components/nav/TopNav/LanguageSelector.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import type { Language } from './types';

interface LanguageSelectorProps {
  activeLocale?: Language['code'];
  languages: Language[];
}

export default function LanguageSelector({ 
  activeLocale = 'en', 
  languages 
}: LanguageSelectorProps) {
  const safeLanguages = Array.isArray(languages) ? languages : [];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout>(null);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Small delay to allow moving to menu
    hoverTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <div 
      className="global-dropdown relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row items-center gap-2 hover:text-gray-900 border-0 bg-transparent"
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" aria-hidden="true">
          {/* SVG path - keep as is */}
          <path fillRule="evenodd" clipRule="evenodd" d="M6 0.5C9.31371 0.5 12 3.18629 12 6.5C12 9.81371 9.31371 12.5 6 12.5C2.68629 12.5 0 9.81371 0 6.5C0 3.18629 2.68629 0.5 6 0.5ZM6 11.4091C6.06227 11.4091 6.4751 11.3038 6.93535 10.2912C7.13742 9.84666 7.30876 9.30149 7.43145 8.68182H4.56855C4.69125 9.30149 4.86258 9.84666 5.06465 10.2912C5.5249 11.3038 5.93773 11.4091 6 11.4091ZM4.41274 7.59091H7.58726C7.61923 7.2414 7.63636 6.87665 7.63636 6.5C7.63636 6.12335 7.61923 5.7586 7.58726 5.40909H4.41274C4.38077 5.7586 4.36364 6.12335 4.36364 6.5C4.36364 6.87665 4.38077 7.2414 4.41274 7.59091ZM4.56855 4.31818C4.69125 3.69851 4.86258 3.15334 5.06465 2.70878C5.5249 1.69624 5.93773 1.59091 6 1.59091C6.06227 1.59091 6.4751 1.69624 6.93535 2.70878C7.13742 3.15334 7.30876 3.69851 7.43145 4.31818H4.56855ZM8.6823 5.40909C8.71184 5.76285 8.72727 6.12746 8.72727 6.5C8.72727 6.87254 8.71184 7.23715 8.6823 7.59091H10.7874C10.8671 7.24006 10.9091 6.87494 10.9091 6.5C10.9091 6.12506 10.8671 5.75994 10.7874 5.40909H8.6823ZM10.3988 4.31818H8.54135C8.37469 3.37933 8.10365 2.55548 7.7596 1.91568C8.91125 2.358 9.85395 3.22179 10.3988 4.31818ZM3.45865 4.31818H1.60119C2.14605 3.22179 3.08875 2.358 4.2404 1.91568C3.89635 2.55548 3.62531 3.37933 3.45865 4.31818ZM1.21255 5.40909H3.3177C3.28816 5.76285 3.27273 6.12746 3.27273 6.5C3.27273 6.87254 3.28816 7.23715 3.3177 7.59091H1.21255C1.13294 7.24006 1.09091 6.87494 1.09091 6.5C1.09091 6.12506 1.13294 5.75994 1.21255 5.40909ZM7.7596 11.0843C8.10365 10.4445 8.37469 9.62067 8.54135 8.68182H10.3988C9.85395 9.77821 8.91125 10.642 7.7596 11.0843ZM4.2404 11.0843C3.08875 10.642 2.14605 9.77821 1.60119 8.68182H3.45865C3.62531 9.62067 3.89635 10.4445 4.2404 11.0843Z" fill="#999999"/>
        </svg>
        <span>Global</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <ul 
          className="global-dropdown-menu absolute top-50 z-999 mt-1 bg-white border shadow-lg list-none p-0 m-0"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ top: '100%', left: 0 }}
        >
          {safeLanguages.map((lang) => (
            <li key={lang.code} className="m-0">
              <a 
                href={lang.href}
                className={`px-4 py-2 text-decoration-none ${
                  lang.code === activeLocale 
                    ? 'fw-bold text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {lang.label} ({lang.code})
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}