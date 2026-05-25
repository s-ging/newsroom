'use client'

import Link from 'next/link'

interface LanguageMenuProps {
  onClose?: () => void
}

// Types and constants
const LANGUAGES = [
  { name: 'English • EN', href: '/search?lang=en' },
  { name: 'Traditional Chinese • 繁體中文	', href: '/search?lang=zh-Hant' },
  { name: 'Simplified Chinese • 简体中文', href: '/search?lang=zh-Hans' },
  { name: 'Japanese • 日本語', href: '/search?lang=ja' },
  { name: 'Korean • 한국어', href: '/search?lang=ko' },
]


export default function LanguageMenu({ onClose }: LanguageMenuProps) {
  return (
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-4">
          {LANGUAGES.map((language) => (
            <div key={language.name} className="dropdown-menu-section">
              <p className="megamenu-title">
                <Link 
                  href={language.href}
                  className="dropdown-link"
                  onClick={onClose}
                >
                  {language.name}
                </Link>
              </p>
            </div>
          ))}
        </div>
  )
}