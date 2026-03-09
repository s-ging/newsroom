// components/nav/TopNav/ClientLinks.tsx
import type { ClientLink } from './types';

interface ClientLinksProps {
  links: ClientLink[];
}

export default function ClientLinks({ links }: ClientLinksProps) {
  const safeLinks = Array.isArray(links) ? links : [];
  
  return (
    <div className="nav-right">
      {/* Wrapper with carousel behavior at mobile */}
      <div 
        className="
          flex flex-row gap-3
          max-[500px]:overflow-x-auto 
          max-[500px]:scrollbar-hide /* Hide ugly scrollbar but keep functionality */
          max-[500px]:whitespace-nowrap
        "
      >
        {safeLinks.map((link) => (
          <a 
            key={link.id}
            href={link.href}
            className="
              text-gray-600 hover:text-gray-900 
              no-underline text-sm
              max-[500px]:inline-block
            "
          >
            {link.label}
          </a>
        ))}
      </div>
      
      {/* Optional: fade indicator at edges - add via CSS pseudo-elements if desired */}
    </div>
  );
}