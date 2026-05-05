// press-release/PressRelease.tsx
import { Hero } from './Hero';
import { Body } from './Body';
import { Company } from './Company';
import { ArticleMeta } from './ArticleMeta';
import { ArticleFooterLink } from './ArticleFooterLink';
import { ShareBar } from './ShareBar';
import type { PressReleaseData } from './types';

interface PressReleaseProps {
  data: PressReleaseData;
  className?: string;
}

export function PressRelease({ data, className = '' }: PressReleaseProps) {
  const company = data.companies?.[0];

  return (
    <article className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      <Hero
        logo={company?.logofilename}
        companyName={company?.company_Name ?? ''}
        headline={data.headline}
        subHeadline={data.subHeadline}
        sectors={data.sector}
        source={data.source}
      />

      <ShareBar headline={data.headline} />

      <Body content={data.bodyHtml} />

      {company && <Company company={company} />}

      <ArticleMeta
        topic={data.topic}
        sectors={data.sector}
        source={data.source}
      />

      <ArticleFooterLink views={data.views} />
    </article>
  );
}
