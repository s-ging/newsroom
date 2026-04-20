// press-release/Company.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { CompanyData as CompanyType } from './types';

interface CompanyProps {
  company: CompanyType;
  className?: string;
}

function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center bg-gray-50 text-sm text-gray-500">
        {alt.substring(0, 3).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="relative w-28 h-28 md:w-24 md:h-24">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        onError={() => setError(true)}
        sizes="(max-width: 768px) 112px, 144px"
      />
    </div>
  );
}

export function Company({ company, className = '' }: CompanyProps) {
  const websiteHref = company.url.startsWith('http')
    ? company.url
    : `https://${company.url}`;

  return (
    <section className={`mt-12 ${className}`}>
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="shrink-0">
          <CompanyLogo src={company.logofilename} alt={company.company_Name} />
        </div>

        <div className="flex-1 md:border-l md:border-gray-300 md:pl-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            About {company.company_Name}
          </h3>

          {company.description && (
            <p className="text-gray-700 leading-relaxed mb-4">
              {company.description}
            </p>
          )}

          <p className="text-gray-700">
            Find out more:{' '}
            <a
              href={websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2088c9] hover:underline"
            >
              {company.url}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
