// press-release/PressRelease.tsx
import { Headline } from './Headline';
import { Meta } from './Meta';
import { Hero } from './Hero';
import { Body } from './Body';
import { Company } from './Company';
import { Footer } from './Footer';
import type { PressReleaseData } from './types';

interface PressReleaseProps {
  data: PressReleaseData;
  className?: string;
}

export function PressRelease({ data, className = '' }: PressReleaseProps) {
  const location = data.location.sub_Location 
    ? `${data.location.sub_Location}, ${data.location.name}`
    : data.location.name;
  
  return (
    <article className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      
      {/* Temporary URL display - remove later */}
      <div className="mb-4 text-sm text-gray-500">
        acnnewswire.com/{data.companies?.[0]?.company_Name?.toLowerCase().replace(/\s+/g, '-') || 'company'}/{data.id}
      </div>
      
      {data.companies?.[0] && (
        <Hero 
          logo={data.companies[0].logofilename}
          companyName={data.companies[0].company_Name}
          headline={data.headline}
        />
      )}
      
      <Headline 
        title={data.headline}
        subhead={data.subHeadline}
      />
      
      <Meta 
        sectors={data.sector}
        topic={data.topic}
        source={data.source}
        dateTime={data.dateTime}
        location={location}
        views={data.views}
      />
      
      <Body content={data.bodyHtml} />
      
      {data.companies?.[0] && (
        <Company company={data.companies[0]} />
      )}
      
      <Footer 
        views={data.views}
        url={data.url}
      />
      
    </article>
  );
}