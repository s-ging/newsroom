// press-release/Hero.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface HeroProps {
  logo?: string | null;
  companyName: string;
  headline: string;
  subHeadline?: string | null;
  sectors?: string[];
  source?: string;
  className?: string;
}

function LogoMark({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="h-10 md:h-12 flex items-center text-sm font-semibold text-gray-700">
        {alt}
      </div>
    );
  }

  return (
    <div className="relative h-10 md:h-12 w-40 md:w-48">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-left"
        onError={() => setError(true)}
        sizes="(max-width: 768px) 160px, 192px"
      />
    </div>
  );
}

export function Hero({
  logo,
  companyName,
  headline,
  subHeadline,
  sectors,
  source,
  className = '',
}: HeroProps) {
  const tagParts: string[] = [];
  if (sectors && sectors.length) {
    tagParts.push(...sectors);
  }
  if (source) {
    tagParts.push(`Source: ${source}`);
  }

  return (
    <header className={`mb-8 ${className}`}>
      <div className="mb-6">
        <LogoMark src={logo || ''} alt={companyName} />
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
        {headline}
      </h1>

      {subHeadline && (
        <p className="mt-4 text-xl md:text-2xl text-gray-400 font-medium leading-relaxed">
          {subHeadline}
        </p>
      )}

      {tagParts.length > 0 && (
        <p className="mt-6 text-xs md:text-sm uppercase text-gray-400">
          {tagParts.map((part, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2 text-gray-400">•</span>}
              <span className={part.startsWith('Source:') ? '' : 'font-semibold text-gray-500'}>
                {part}
              </span>
            </span>
          ))}
        </p>
      )}

      <hr className="mt-6 border-gray-200" />
    </header>
  );
}
