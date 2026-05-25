// app/search/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | ACN Newswire',
  description: 'Search press releases by company, sector, industry, region, and more.',
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
