import { HomeHero } from '@/components/home/HomeHero';
import { BusinessRow } from '@/components/home/BusinessRow';
import { fetchLatestNews, type NewsListItem } from '@/services/news-list';
import { mockPressRelease } from '@/services/mock-press-release';
import type { PressReleaseData } from '@/components/press-release/types';

const BUSINESS_ROW_LIMIT = 10;

const heroSlides: PressReleaseData[] = [
  mockPressRelease,
  { ...mockPressRelease, id: 900002, headline: 'Featured story 2 (placeholder)' },
  { ...mockPressRelease, id: 900003, headline: 'Featured story 3 (placeholder)' },
];

export default async function Home() {
  let businessItems: NewsListItem[] = [];
  try {
    businessItems = await fetchLatestNews(BUSINESS_ROW_LIMIT);
  } catch {
    businessItems = [];
  }

  return (
    <main>
      <HomeHero slides={heroSlides} />
      <BusinessRow items={businessItems} />
    </main>
  );
}
