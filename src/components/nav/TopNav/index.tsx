// components/nav/TopNav/index.tsx
import './TopNav.css';

import type { TopNavProps } from './types';
import { DEFAULT_LANGUAGES, DEFAULT_CLIENT_LINKS } from './types';
import LanguageSelector from './LanguageSelector';
import DateTimeDisplay from './DateTimeDisplay';
import ClientLinks from './ClientLinks';

export default function TopNav({ 
  activeLocale = 'en',
  languages = DEFAULT_LANGUAGES,
  clientLinks = DEFAULT_CLIENT_LINKS,
  currentDateTime
}: TopNavProps) {
  
  return (
    <section className="top-nav relative z-888">
      <div className="flex flex-row justify-between items-center min-h-9">
        {/* Left: Language selector */}
        <div className="nav-left flex">
          <LanguageSelector 
            activeLocale={activeLocale}
            languages={languages}
          />
        </div>

        {/* Center: DateTime - hidden below 768px, absolutely centered when visible */}
        <div className="
          hidden 
          md:block 
          absolute 
          left-1/2 
          -translate-x-1/2
          whitespace-nowrap
        ">
          <DateTimeDisplay dateTime={currentDateTime} />
        </div>

        {/* Right: Client links */}
        <div className="nav-right ml-auto">
          <ClientLinks links={clientLinks} />
        </div>
      </div>
    </section>
  );
}