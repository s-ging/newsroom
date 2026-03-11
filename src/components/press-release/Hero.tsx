// press-release/Hero.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface HeroProps {
  logo?: string | null;
  companyName: string;
  headline?: string;
  className?: string;
}

function HeroImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-sm text-center px-2">
          {alt.substring(0, 3)}...
        </span>
      </div>
    );
  }
  
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      <Image 
        src={src}
        alt={alt}
        fill
        className="object-contain"
        onError={() => setError(true)}
        sizes="(max-width: 768px) 128px, 160px"
      />
    </div>
  );
}

export function Hero({ logo, companyName, headline, className = '' }: HeroProps) {
  return (
    <div className={`bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg border border-gray-200 mb-6 ${className}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-shrink-0">
          <HeroImage src={logo || ''} alt={companyName} />
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {companyName}
          </h2>
          
          {headline && (
            <p className="text-gray-600 line-clamp-2">
              {headline}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}